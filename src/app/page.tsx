"use client";

import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ItemRow {
  id: number;
  itemName: string;
  grossWeight: number;
  lessWeight: number;
  netWeight: number;
  purity: number;
  pureWeight: number;
  labourRate: number;
  totalLabour: number;
}

interface Party {
  id: number;
  name: string;
  type: "Supplier" | "Customer";
  mobile: string;
  city: string;
  gstin: string;
}

interface KarigarLog {
  id: number;
  karigarName: string;
  issuedPureWt: number;
  receivedPureWt: number;
  date: string;
  notes: string;
}

export default function OmAradhanaSilverApp() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<"sales" | "purchase" | "parties" | "karigar" | "print">("sales");

  // Firm Details
  const firmName = "OM ARADHANA SILVER";
  const firmAddress = "Wholesale Silver Market, Ahmedabad";
  const firmContact = "+91 98765 43210";

  // Metal & Market Rate
  const [metalType, setMetalType] = useState<"Silver" | "Gold">("Silver");
  const [metalRate, setMetalRate] = useState<number>(85000); // Rate per Kg (Silver) / per 10g (Gold)

  // --- LOCALSTORAGE PERSISTENT STATES ---
  const [customerName, setCustomerName] = useState<string>("Shree Jewellers");
  const [isPakkaBill, setIsPakkaBill] = useState<boolean>(false);
  const [gstNumber, setGstNumber] = useState<string>("24AAAAA0000A1Z5");
  
  const [salesItems, setSalesItems] = useState<ItemRow[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("om_sales_items");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [sReceivedPure, setSReceivedPure] = useState<number>(0);
  const [sReceivedCash, setSReceivedCash] = useState<number>(0);

  const [supplierName, setSupplierName] = useState<string>("Ramesh Karigar / Rajkot");
  
  const [purchaseItems, setPurchaseItems] = useState<ItemRow[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("om_purchase_items");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [pGivenPure, setPGivenPure] = useState<number>(0);
  const [pPaidCash, setPPaidCash] = useState<number>(0);

  // Common Item Input
  const [itemName, setItemName] = useState<string>("Fancy Payal");
  const [grossWeight, setGrossWeight] = useState<number>(250);
  const [lessWeight, setLessWeight] = useState<number>(5);
  const [purity, setPurity] = useState<number>(80);
  const [labourRate, setLabourRate] = useState<number>(15);

  // Parties Directory
  const [parties, setParties] = useState<Party[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("om_parties");
      return saved ? JSON.parse(saved) : [
        { id: 1, name: "Ramesh Karigar", type: "Supplier", mobile: "9825012345", city: "Rajkot", gstin: "" },
        { id: 2, name: "Shree Jewellers", type: "Customer", mobile: "9426098765", city: "Ahmedabad", gstin: "24AAAAA0000A1Z5" }
      ];
    }
    return [];
  });

  const [newPartyName, setNewPartyName] = useState("");
  const [newPartyType, setNewPartyType] = useState<"Supplier" | "Customer">("Customer");
  const [newPartyCity, setNewPartyCity] = useState("");
  const [newPartyMobile, setNewPartyMobile] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // --- KARIGAR JOB WORK / GHAAT LEDGER STATE ---
  const [karigarLogs, setKarigarLogs] = useState<KarigarLog[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("om_karigar_logs");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [kName, setKName] = useState("");
  const [kIssued, setKIssued] = useState<number>(0);
  const [kReceived, setKReceived] = useState<number>(0);
  const [kNotes, setKNotes] = useState("");

  // Sync to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("om_sales_items", JSON.stringify(salesItems));
  }, [salesItems]);

  useEffect(() => {
    localStorage.setItem("om_purchase_items", JSON.stringify(purchaseItems));
  }, [purchaseItems]);

  useEffect(() => {
    localStorage.setItem("om_parties", JSON.stringify(parties));
  }, [parties]);

  useEffect(() => {
    localStorage.setItem("om_karigar_logs", JSON.stringify(karigarLogs));
  }, [karigarLogs]);

  // Calculations for current active input
  const currentNetWeight = Math.max(0, grossWeight - lessWeight);
  const currentPureWeight = (currentNetWeight * purity) / 100;
  const currentTotalLabour = currentNetWeight * labourRate;

  const handleAddSalesItem = () => {
    if (grossWeight <= 0) return;
    const newItem: ItemRow = {
      id: Date.now(),
      itemName,
      grossWeight,
      lessWeight,
      netWeight: currentNetWeight,
      purity,
      pureWeight: currentPureWeight,
      labourRate,
      totalLabour: currentTotalLabour,
    };
    setSalesItems([...salesItems, newItem]);
    setGrossWeight(0);
    setLessWeight(0);
  };

  const handleAddPurchaseItem = () => {
    if (grossWeight <= 0) return;
    const newItem: ItemRow = {
      id: Date.now(),
      itemName,
      grossWeight,
      lessWeight,
      netWeight: currentNetWeight,
      purity,
      pureWeight: currentPureWeight,
      labourRate,
      totalLabour: currentTotalLabour,
    };
    setPurchaseItems([...purchaseItems, newItem]);
    setGrossWeight(0);
    setLessWeight(0);
  };

  const calcTotals = (list: ItemRow[]) => {
    const gross = list.reduce((acc, i) => acc + i.grossWeight, 0);
    const less = list.reduce((acc, i) => acc + i.lessWeight, 0);
    const net = list.reduce((acc, i) => acc + i.netWeight, 0);
    const pure = list.reduce((acc, i) => acc + i.pureWeight, 0);
    const labour = list.reduce((acc, i) => acc + i.totalLabour, 0);
    return { gross, less, net, pure, labour };
  };

  const salesTotals = calcTotals(salesItems);
  const purchaseTotals = calcTotals(purchaseItems);

  const ratePerGram = metalType === "Silver" ? metalRate / 1000 : metalRate / 10;
  const salesMetalValue = salesTotals.pure * ratePerGram;
  const salesGrandTotal = salesMetalValue + salesTotals.labour;
  const salesNetCashDue = salesGrandTotal - sReceivedCash;
  const salesNetPureDue = salesTotals.pure - sReceivedPure;

  const purchaseMetalValue = purchaseTotals.pure * ratePerGram;
  const purchaseGrandTotal = purchaseMetalValue + purchaseTotals.labour;
  const purchaseNetCashDue = purchaseGrandTotal - pPaidCash;
  const purchaseNetPureDue = purchaseTotals.pure - pGivenPure;

  // --- PDF DOWNLOAD & WHATSAPP SHARE HANDLERS ---
  const downloadPDF = async () => {
    const element = document.getElementById("printable-invoice");
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${customerName}_Invoice.pdf`);
  };

  const sendWhatsApp = () => {
    const message = `*${firmName}* \nBilled To: ${customerName}\nTotal Pure Wt: ${salesTotals.pure.toFixed(3)}g\nNet Cash Due: ₹${salesNetCashDue.toFixed(2)}\nNet Pure Due: ${salesNetPureDue.toFixed(3)}g\nThank you for your business!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Top Header */}
      <header className="mb-6 pb-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-amber-400 tracking-wide">
            {firmName}
          </h1>
          <p className="text-xs text-slate-400">
            Enterprise Wholesale Silver Management & Billing System (Persistent Offline Ready)
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("sales")}
            className={`px-3 py-2 rounded-lg font-bold text-xs transition ${
              activeTab === "sales" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            1. Sales Invoice
          </button>
          <button
            onClick={() => setActiveTab("purchase")}
            className={`px-3 py-2 rounded-lg font-bold text-xs transition ${
              activeTab === "purchase" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            2. Purchase Inward
          </button>
          <button
            onClick={() => setActiveTab("parties")}
            className={`px-3 py-2 rounded-lg font-bold text-xs transition ${
              activeTab === "parties" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            3. Parties & Media
          </button>
          <button
            onClick={() => setActiveTab("karigar")}
            className={`px-3 py-2 rounded-lg font-bold text-xs transition ${
              activeTab === "karigar" ? "bg-cyan-500 text-slate-950" : "text-cyan-400 hover:bg-slate-800"
            }`}
          >
            4. Karigar Job Work Ledger
          </button>
          <button
            onClick={() => setActiveTab("print")}
            className={`px-3 py-2 rounded-lg font-bold text-xs transition ${
              activeTab === "print" ? "bg-emerald-500 text-slate-950" : "text-emerald-400 hover:bg-slate-800"
            }`}
          >
            🖨️ Invoice Preview
          </button>
        </div>
      </header>

      {/* Global Rate Bar */}
      <div className="mb-6 bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase">Precious Metal:</span>
          <select
            value={metalType}
            onChange={(e) => setMetalType(e.target.value as "Silver" | "Gold")}
            className="bg-slate-800 text-amber-300 font-bold px-3 py-1.5 rounded-lg border border-slate-700 text-sm"
          >
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase">
            Market Rate ({metalType === "Silver" ? "₹/Kg" : "₹/10g"}):
          </span>
          <input
            type="number"
            value={metalRate}
            onChange={(e) => setMetalRate(Number(e.target.value))}
            className="w-32 bg-slate-800 text-emerald-400 font-bold px-3 py-1.5 rounded-lg border border-slate-700 text-right text-sm"
          />
        </div>
      </div>

      {/* ================= 1. SALES BILLING TAB ================= */}
      {activeTab === "sales" && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Customer / Client Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-amber-300 font-semibold"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                <input
                  type="checkbox"
                  checked={isPakkaBill}
                  onChange={(e) => setIsPakkaBill(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
                GST Tax Invoice (B2B)
              </label>
            </div>

            {isPakkaBill && (
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-emerald-300 font-semibold text-xs"
                />
              </div>
            )}
          </div>

          {/* Item Input Form */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Add Invoice Line Item</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="col-span-2">
                <label className="block text-xs text-slate-400 mb-1">Item Description</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Gross Wt (g)</label>
                <input
                  type="number"
                  step="0.001"
                  value={grossWeight || ""}
                  onChange={(e) => setGrossWeight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-emerald-400 font-bold text-right"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Deduction / Less (g)</label>
                <input
                  type="number"
                  step="0.001"
                  value={lessWeight || ""}
                  onChange={(e) => setLessWeight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-rose-300 font-semibold text-right"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Purity (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={purity || ""}
                  onChange={(e) => setPurity(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-amber-300 font-bold text-right"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Labour (₹/g)</label>
                <input
                  type="number"
                  value={labourRate || ""}
                  onChange={(e) => setLabourRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-cyan-300 font-bold text-right"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center pt-3 border-t border-slate-800 text-xs gap-2">
              <div className="flex gap-4 text-slate-400">
                <span>Net Wt: <strong className="text-cyan-300">{currentNetWeight.toFixed(3)} g</strong></span>
                <span>Pure Wt: <strong className="text-amber-400">{currentPureWeight.toFixed(3)} g</strong></span>
                <span>Labour: <strong className="text-emerald-400">₹ {currentTotalLabour.toFixed(2)}</strong></span>
              </div>
              <button
                onClick={handleAddSalesItem}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-6 py-2.5 rounded-lg shadow-lg"
              >
                + Add Item
              </button>
            </div>
          </div>

          {/* Sales Table */}
          {salesItems.length > 0 && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Item Description</th>
                      <th className="p-3 text-right">Gross Wt</th>
                      <th className="p-3 text-right">Deduction</th>
                      <th className="p-3 text-right">Net Wt</th>
                      <th className="p-3 text-right">Purity %</th>
                      <th className="p-3 text-right">Pure Wt</th>
                      <th className="p-3 text-right">Labour (₹/g)</th>
                      <th className="p-3 text-right">Total Labour</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {salesItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-medium text-slate-200">{item.itemName}</td>
                        <td className="p-3 text-right text-emerald-400 font-semibold">{item.grossWeight.toFixed(3)} g</td>
                        <td className="p-3 text-right text-rose-300">{item.lessWeight.toFixed(3)} g</td>
                        <td className="p-3 text-right font-bold text-cyan-300">{item.netWeight.toFixed(3)} g</td>
                        <td className="p-3 text-right font-bold text-amber-300">{item.purity}%</td>
                        <td className="p-3 text-right font-black text-amber-400">{item.pureWeight.toFixed(3)} g</td>
                        <td className="p-3 text-right text-slate-300">₹{item.labourRate}</td>
                        <td className="p-3 text-right font-bold text-emerald-400">₹{item.totalLabour.toFixed(2)}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSalesItems(salesItems.filter((i) => i.id !== item.id))}
                            className="text-rose-400 hover:text-rose-300 font-bold"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-950/90 font-black text-slate-100">
                      <td className="p-3 text-amber-400 uppercase">Total</td>
                      <td className="p-3 text-right text-emerald-400">{salesTotals.gross.toFixed(3)} g</td>
                      <td className="p-3 text-right text-rose-300">{salesTotals.less.toFixed(3)} g</td>
                      <td className="p-3 text-right text-cyan-300">{salesTotals.net.toFixed(3)} g</td>
                      <td className="p-3 text-right">-</td>
                      <td className="p-3 text-right text-amber-400 text-sm">{salesTotals.pure.toFixed(3)} g</td>
                      <td className="p-3 text-right">-</td>
                      <td className="p-3 text-right text-emerald-400 text-sm">₹ {salesTotals.labour.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settlement Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Received Against Invoice (Metal / Cash)</h3>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Pure Metal Received (Grams)</label>
                <input
                  type="number"
                  step="0.001"
                  value={sReceivedPure || ""}
                  onChange={(e) => setSReceivedPure(Number(e.target.value))}
                  placeholder="0.000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-amber-300 font-bold text-right"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Cash Received / Advance (₹)</label>
                <input
                  type="number"
                  value={sReceivedCash || ""}
                  onChange={(e) => setSReceivedCash(Number(e.target.value))}
                  placeholder="0"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-emerald-300 font-bold text-right"
                />
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2 mb-3">
                  Account Summary & Balance Due
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Invoice Pure Weight:</span>
                    <span className="font-bold text-slate-200">{salesTotals.pure.toFixed(3)} g</span>
                  </div>
                  <div className="flex justify-between text-sm pt-1 border-t border-slate-800">
                    <span className="font-bold text-slate-300">Net Pure Weight Balance Due:</span>
                    <span className="font-black text-amber-400">{salesNetPureDue.toFixed(3)} g</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-slate-400">Total Invoice Value (Metal + Labour):</span>
                    <span className="font-bold text-slate-200">₹ {salesGrandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-300">Net Cash Balance Due:</span>
                    <span className="font-black text-emerald-400">₹ {salesNetCashDue.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("print")}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl mt-4 shadow-lg text-xs"
              >
                Proceed to Professional Invoice Preview ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. PURCHASE INWARD TAB ================= */}
      {activeTab === "purchase" && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <label className="block text-xs font-bold text-slate-400 mb-1">Supplier / Manufacturer Name</label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-amber-300 font-semibold"
              />
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Inward Pure Wt</span>
              <span className="text-2xl font-black text-amber-400">{purchaseTotals.pure.toFixed(3)} g</span>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Add Received Inward Stock</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="col-span-2">
                <label className="block text-xs text-slate-400 mb-1">Item Description</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Gross Wt (g)</label>
                <input
                  type="number"
                  step="0.001"
                  value={grossWeight || ""}
                  onChange={(e) => setGrossWeight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-emerald-400 font-bold text-right"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Deduction (g)</label>
                <input
                  type="number"
                  step="0.001"
                  value={lessWeight || ""}
                  onChange={(e) => setLessWeight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-rose-300 font-semibold text-right"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Purity (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={purity || ""}
                  onChange={(e) => setPurity(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-amber-300 font-bold text-right"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Making (₹/g)</label>
                <input
                  type="number"
                  value={labourRate || ""}
                  onChange={(e) => setLabourRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-cyan-300 font-bold text-right"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Net: <strong className="text-cyan-300">{currentNetWeight.toFixed(3)} g</strong> | Pure: <strong className="text-amber-400">{currentPureWeight.toFixed(3)} g</strong></span>
              <button
                onClick={handleAddPurchaseItem}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-6 py-2.5 rounded-lg shadow-lg"
              >
                + Add Inward Item
              </button>
            </div>
          </div>

          {purchaseItems.length > 0 && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3 text-right">Gross Wt</th>
                    <th className="p-3 text-right">Deduction</th>
                    <th className="p-3 text-right">Net Wt</th>
                    <th className="p-3 text-right">Purity %</th>
                    <th className="p-3 text-right">Pure Wt</th>
                    <th className="p-3 text-right">Making</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {purchaseItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50">
                      <td className="p-3 font-medium text-slate-200">{item.itemName}</td>
                      <td className="p-3 text-right text-emerald-400 font-semibold">{item.grossWeight.toFixed(3)} g</td>
                      <td className="p-3 text-right text-rose-300">{item.lessWeight.toFixed(3)} g</td>
                      <td className="p-3 text-right font-bold text-cyan-300">{item.netWeight.toFixed(3)} g</td>
                      <td className="p-3 text-right font-bold text-amber-300">{item.purity}%</td>
                      <td className="p-3 text-right font-black text-amber-400">{item.pureWeight.toFixed(3)} g</td>
                      <td className="p-3 text-right text-slate-300">₹{item.labourRate}/g</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setPurchaseItems(purchaseItems.filter((i) => i.id !== item.id))}
                          className="text-rose-400 font-bold"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase">Settlement (Pure Metal / Cash Paid)</h3>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Pure Metal Given / Settled (Grams)</label>
                <input
                  type="number"
                  step="0.001"
                  value={pGivenPure || ""}
                  onChange={(e) => setPGivenPure(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-amber-300 font-bold text-right"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Cash Paid (₹)</label>
                <input
                  type="number"
                  value={pPaidCash || ""}
                  onChange={(e) => setPPaidCash(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-emerald-300 font-bold text-right"
                />
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-300 uppercase border-b border-slate-800 pb-2 mb-3">Supplier Balance Due</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Net Pure Metal Payable:</span>
                    <span className="font-black text-amber-400">{purchaseNetPureDue.toFixed(3)} g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Net Cash Payable:</span>
                    <span className="font-black text-emerald-400">₹ {purchaseNetCashDue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-emerald-500 text-slate-950 font-black py-3 rounded-xl mt-4 text-xs">
                Save Purchase Inward Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. PARTIES & MEDIA TAB ================= */}
      {activeTab === "parties" && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Add New Business Entity</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <input
                type="text"
                placeholder="Party Name"
                value={newPartyName}
                onChange={(e) => setNewPartyName(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
              />
              <select
                value={newPartyType}
                onChange={(e) => setNewPartyType(e.target.value as "Supplier" | "Customer")}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-amber-300 font-bold"
              >
                <option value="Customer">Customer</option>
                <option value="Supplier">Supplier</option>
              </select>
              <input
                type="text"
                placeholder="City"
                value={newPartyCity}
                onChange={(e) => setNewPartyCity(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={newPartyMobile}
                onChange={(e) => setNewPartyMobile(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
              />
              <button
                onClick={() => {
                  if (!newPartyName) return;
                  setParties([...parties, { id: Date.now(), name: newPartyName, type: newPartyType, city: newPartyCity, mobile: newPartyMobile, gstin: "" }]);
                  setNewPartyName("");
                  setNewPartyCity("");
                  setNewPartyMobile("");
                }}
                className="bg-amber-500 text-slate-950 font-bold text-xs rounded-lg py-2"
              >
                + Save Entity
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Upload Document / Item Photo Proof</h2>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer"
              />
              {uploadedImage && (
                <div className="flex items-center gap-4">
                  <img src={uploadedImage} alt="Uploaded Proof" className="w-24 h-24 object-cover rounded-xl border border-slate-700" />
                  <button onClick={() => setUploadedImage(null)} className="text-rose-400 text-xs font-bold">Remove Photo</button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Party Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Mobile</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {parties.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-200">{p.name}</td>
                    <td className="p-3 text-amber-400 font-semibold">{p.type}</td>
                    <td className="p-3 text-slate-300">{p.city}</td>
                    <td className="p-3 text-slate-300">{p.mobile}</td>
                    <td className="p-3 text-center">
                      <button onClick={() => setParties(parties.filter(x => x.id !== p.id))} className="text-rose-400 font-bold">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 4. KARIGAR JOB WORK LEDGER TAB ================= */}
      {activeTab === "karigar" && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-cyan-500/30 space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Karigar Metal Issue & Return Tracker (Ghaat Hisaab)</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <input
                type="text"
                placeholder="Karigar Name"
                value={kName}
                onChange={(e) => setKName(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
              />
              <input
                type="number"
                step="0.001"
                placeholder="Pure Wt Issued (g)"
                value={kIssued || ""}
                onChange={(e) => setKIssued(Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-amber-400 font-bold text-right"
              />
              <input
                type="number"
                step="0.001"
                placeholder="Pure Wt Received (g)"
                value={kReceived || ""}
                onChange={(e) => setKReceived(Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-emerald-400 font-bold text-right"
              />
              <input
                type="text"
                placeholder="Notes / Order Details"
                value={kNotes}
                onChange={(e) => setKNotes(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
              />
              <button
                onClick={() => {
                  if (!kName) return;
                  const newEntry: KarigarLog = {
                    id: Date.now(),
                    karigarName: kName,
                    issuedPureWt: kIssued,
                    receivedPureWt: kReceived,
                    date: new Date().toLocaleDateString(),
                    notes: kNotes,
                  };
                  setKarigarLogs([...karigarLogs, newEntry]);
                  setKName("");
                  setKIssued(0);
                  setKReceived(0);
                  setKNotes("");
                }}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs rounded-lg py-2 shadow-lg"
              >
                + Record Entry
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Karigar Name</th>
                  <th className="p-3">Notes</th>
                  <th className="p-3 text-right">Pure Issued (g)</th>
                  <th className="p-3 text-right">Pure Received (g)</th>
                  <th className="p-3 text-right">Balance Due (g)</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {karigarLogs.map((log) => {
                  const balance = log.issuedPureWt - log.receivedPureWt;
                  return (
                    <tr key={log.id} className="hover:bg-slate-800/50">
                      <td className="p-3 text-slate-400">{log.date}</td>
                      <td className="p-3 font-bold text-slate-200">{log.karigarName}</td>
                      <td className="p-3 text-slate-300">{log.notes || "-"}</td>
                      <td className="p-3 text-right text-amber-400 font-bold">{log.issuedPureWt.toFixed(3)} g</td>
                      <td className="p-3 text-right text-emerald-400 font-bold">{log.receivedPureWt.toFixed(3)} g</td>
                      <td className={`p-3 text-right font-black ${balance > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                        {balance.toFixed(3)} g
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setKarigarLogs(karigarLogs.filter((l) => l.id !== log.id))}
                          className="text-rose-400 font-bold"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 5. PROFESSIONAL INVOICE PRINT PREVIEW TAB ================= */}
      {activeTab === "print" && (
        <div className="space-y-6">
          <div className="flex flex-wrap justify-end gap-3">
            <button
              onClick={sendWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs shadow-lg flex items-center gap-2"
            >
              💬 Share on WhatsApp
            </button>
            <button
              onClick={downloadPDF}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs shadow-lg"
            >
              📥 Download PDF
            </button>
            <button
              onClick={() => window.print()}
              className="bg-slate-200 hover:bg-white text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs shadow-lg"
            >
              🖨️ Direct Print
            </button>
          </div>

          {/* Printable Professional Invoice Box */}
          <div id="printable-invoice" className="bg-white text-slate-900 p-8 rounded-xl max-w-4xl mx-auto shadow-2xl font-sans border border-slate-300">
            {/* Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4 mb-4">
              <h2 className="text-2xl font-black tracking-wider text-slate-900">{firmName}</h2>
              <p className="text-xs font-medium text-slate-700">{firmAddress} | Contact: {firmContact}</p>
              {isPakkaBill && <p className="text-xs font-bold text-slate-800 mt-1">GSTIN: {gstNumber}</p>}
            </div>

            {/* Bill Info */}
            <div className="flex justify-between text-xs mb-4 border-b border-slate-300 pb-3">
              <div>
                <span className="font-bold text-slate-600 block">Billed To:</span>
                <span className="text-base font-black text-slate-900">{customerName}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-600 block">Date: {new Date().toLocaleDateString()}</span>
                <span className="font-bold text-slate-800">Invoice Type: {isPakkaBill ? "GST Tax Invoice" : "Wholesale Delivery Challan"}</span>
              </div>
            </div>

            {/* Professional Grid Table */}
            <table className="w-full text-xs border-collapse border border-slate-400 mb-6">
              <thead>
                <tr className="bg-slate-200 text-slate-900 border-b border-slate-400">
                  <th className="border border-slate-400 p-2 text-left">Item Description</th>
                  <th className="border border-slate-400 p-2 text-right">Gross Wt</th>
                  <th className="border border-slate-400 p-2 text-right">Deduction</th>
                  <th className="p-3 border border-slate-400 text-right">Net Wt</th>
                  <th className="border border-slate-400 p-2 text-right">Purity %</th>
                  <th className="border border-slate-400 p-2 text-right">Pure Wt</th>
                  <th className="border border-slate-400 p-2 text-right">Labour</th>
                  <th className="border border-slate-400 p-2 text-right">Total Labour</th>
                </tr>
              </thead>
              <tbody>
                {salesItems.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-300">
                    <td className="border border-slate-400 p-2 font-medium">{item.itemName}</td>
                    <td className="border border-slate-400 p-2 text-right">{item.grossWeight.toFixed(3)}</td>
                    <td className="border border-slate-400 p-2 text-right">{item.lessWeight.toFixed(3)}</td>
                    <td className="border border-slate-400 p-2 text-right font-bold">{item.netWeight.toFixed(3)}</td>
                    <td className="border border-slate-400 p-2 text-right">{item.purity}%</td>
                    <td className="border border-slate-400 p-2 text-right font-bold">{item.pureWeight.toFixed(3)}</td>
                    <td className="border border-slate-400 p-2 text-right">₹{item.labourRate}</td>
                    <td className="border border-slate-400 p-2 text-right font-bold">₹{item.totalLabour.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="font-black bg-slate-100 border-t-2 border-slate-400">
                  <td className="border border-slate-400 p-2">TOTAL</td>
                  <td className="border border-slate-400 p-2 text-right">{salesTotals.gross.toFixed(3)}</td>
                  <td className="border border-slate-400 p-2 text-right">{salesTotals.less.toFixed(3)}</td>
                  <td className="border border-slate-400 p-2 text-right">{salesTotals.net.toFixed(3)}</td>
                  <td className="border border-slate-400 p-2 text-right">-</td>
                  <td className="border border-slate-400 p-2 text-right text-sm">{salesTotals.pure.toFixed(3)} g</td>
                  <td className="border border-slate-400 p-2 text-right">-</td>
                  <td className="border border-slate-400 p-2 text-right text-sm">₹ {salesTotals.labour.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Summary & Sign */}
            <div className="flex justify-between items-end pt-6 border-t border-slate-400 text-xs">
              <div className="space-y-1">
                <p className="font-bold">Account Settlement Summary:</p>
                <p>Net Pure Weight Balance Due: <strong className="text-amber-700">{salesNetPureDue.toFixed(3)} grams</strong></p>
                <p>Net Cash Balance Due: <strong className="text-emerald-700">₹ {salesNetCashDue.toFixed(2)}</strong></p>
                <p className="text-[10px] text-slate-500 mt-4">Subject to Ahmedabad Jurisdiction.</p>
              </div>
              <div className="text-center">
                <div className="h-14"></div>
                <p className="font-bold border-t border-slate-400 pt-1 px-6">Authorized Signatory</p>
                <p className="text-[10px]">{firmName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}