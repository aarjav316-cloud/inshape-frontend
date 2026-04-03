import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, AlertCircle, Clock, Search, Plus, Bell,
  LayoutDashboard, BarChart2, FileText, Settings, HelpCircle, Activity,
  Menu, X, Filter, Download, LogOut, Edit2, Trash2, ChevronDown,
  DollarSign, TrendingUp, TrendingDown, PieChart
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPie, Pie, Cell,
  BarChart, Bar, Legend
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("overview");

  // API State
  const [stats, setStats] = useState({ totalMembers: 0, overdue: 0, dueSoon: 0, paid: 0 });
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plan: "monthly",
    feeAmount: "",
    lastPaymentDate: "",
    nextDueDate: ""
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const BASE_URL = `${API_URL}/api/members`;

  // Fetch Stats and Members
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin-login");
        return;
      }
      
      const headers = { Authorization: `Bearer ${token}` };

      // Get Stats
      const statsRes = await fetch(`${BASE_URL}/stats`, { headers });
      if (statsRes.status === 401) {
        localStorage.removeItem("token");
        navigate("/admin-login");
        return;
      }
      
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }

      // Get Members (Search/Filter)
      let url = BASE_URL;
      if (searchTerm || filter !== "all") {
        url = `${BASE_URL}/search?search=${encodeURIComponent(searchTerm)}&filter=${filter}`;
      }
      
      const membersRes = await fetch(url, { headers });
      if (membersRes.ok) {
        setMembers(await membersRes.json());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, searchTerm]); // Re-fetch when filter or search changes

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingMember(null);
    setFormData({
      name: "", phone: "", plan: "monthly", feeAmount: "", 
      lastPaymentDate: new Date().toISOString().split('T')[0], 
      nextDueDate: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      phone: member.phone,
      plan: member.plan,
      feeAmount: member.feeAmount,
      lastPaymentDate: new Date(member.lastPaymentDate).toISOString().split('T')[0],
      nextDueDate: new Date(member.nextDueDate).toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  // Submit Add/Edit
  const handleSaveMember = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
      return;
    }
    
    const url = editingMember ? `${BASE_URL}/${editingMember._id}` : `${BASE_URL}/add`;
    const method = editingMember ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      
      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/admin-login");
        return;
      }
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchDashboardData(); // Refresh UI
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.message}`);
      }
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  // Delete Member
  const handleDeleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin-login");
        return;
      }
      
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/admin-login");
        return;
      }
      
      if (res.ok) fetchDashboardData();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  const statCardsData = [
    { label: "Total Members", value: stats.totalMembers, icon: Users },
    { label: "Overdue", value: stats.overdue, icon: AlertCircle, trendCurrent: "down" },
    { label: "Due Soon", value: stats.dueSoon, icon: Clock },
    { label: "Active Now", value: stats.paid, icon: Activity },
  ];

  const getStatusBadge = (status) => {
    if (status === 'overdue') return <span className="text-red-400 bg-red-400/10 border-red-500/20 border px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider">Overdue</span>;
    if (status === 'due-soon') return <span className="text-amber-400 bg-amber-400/10 border-amber-500/20 border px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider">Due Soon</span>;
    return <span className="text-emerald-400 bg-emerald-400/10 border-emerald-500/20 border px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider">Paid</span>;
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-neutral-300 font-sans overflow-hidden selection:bg-white/20">
      
      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[260px] bg-[#0a0a0a] border-r border-white/10 
        transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full w-full p-5 lg:p-6">
          <div className="flex items-center gap-3 mt-4 mb-8 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black text-sm shadow-sm shrink-0">
              IN
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white m-0">INSHAPE</h1>
            <button className="lg:hidden ml-auto text-neutral-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-6">
            <nav className="flex flex-col gap-2">
              <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={currentView === "overview"} onClick={() => { setCurrentView("overview"); setIsSidebarOpen(false); }} />
              <NavItem icon={<Users size={20} />} label="Members" active={currentView === "members"} onClick={() => { setCurrentView("members"); setIsSidebarOpen(false); }} />
              <NavItem icon={<BarChart2 size={20} />} label="Analytics" active={currentView === "analytics"} onClick={() => { setCurrentView("analytics"); setIsSidebarOpen(false); }} />
              <NavItem icon={<FileText size={20} />} label="Reports" active={currentView === "reports"} onClick={() => { setCurrentView("reports"); setIsSidebarOpen(false); }} />
              
              <div className="mt-8 mb-3 px-1">
                <span className="text-[11px] font-bold text-neutral-500 tracking-widest uppercase">System</span>
              </div>
              
              <NavItem icon={<Settings size={20} />} label="Settings" />
              <NavItem icon={<HelpCircle size={20} />} label="Support" />
            </nav>
          </div>

          <div className="mt-auto pt-5 border-t border-white/10 shrink-0">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 text-left group">
              <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-white text-sm font-semibold border border-white/10 shadow-sm relative overflow-hidden shrink-0">
                AD
                <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-neutral-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-white truncate group-hover:text-white">Admin User</p>
                <p className="text-[12px] text-neutral-500 truncate mt-0.5">Workspace Owner</p>
              </div>
              <div className="p-1.5 rounded-md hover:bg-white/10 text-neutral-500 hover:text-red-400 transition-colors">
                  <LogOut size={16} />
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
        
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-20 bg-[#0a0a0a]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-neutral-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-white hidden sm:block capitalize">{currentView}</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-neutral-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8 flex flex-col h-full">
            
            {/* STATS GRID */}
            {currentView === "overview" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {statCardsData.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>
            )}

            {/* ANALYTICS VIEW */}
            {currentView === "analytics" && (
              <AnalyticsView members={members} stats={stats} />
            )}

            {/* REPORTS VIEW */}
            {currentView === "reports" && (
              <ReportsView members={members} />
            )}

            {/* MEMBER LIST CONTAINER */}
            {(currentView === "overview" || currentView === "members") && (
            <div className="flex-1 flex flex-col bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden shadow-sm min-h-[500px]">
              
              {/* TABLE HEADER */}
              <div className="px-6 py-5 border-b border-white/5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-white">Member Directory</h3>
                  <p className="text-sm text-neutral-500 mt-0.5">Manage and organize your member base</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-56 pl-9 pr-4 py-2 bg-[#111] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-neutral-500 transition-colors text-white"
                    />
                  </div>
                  
                  <div className="relative">
                    <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="appearance-none pl-9 pr-8 py-2 bg-[#111] border border-white/10 rounded-lg text-sm text-neutral-300 focus:outline-none focus:border-neutral-500 cursor-pointer outline-none"
                    >
                      <option value="all">All Status</option>
                      <option value="paid">Paid</option>
                      <option value="due-soon">Due Soon</option>
                      <option value="unpaid">Overdue</option>
                    </select>
                  </div>

                  <button onClick={handleOpenAddModal} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors">
                    <Plus size={16} />
                    Add Member
                  </button>
                </div>
              </div>

              {/* TABLE CONTENT / EMPTY STATE */}
              {loading ? (
                <div className="flex-1 flex items-center justify-center p-12 text-neutral-400">Loading data...</div>
              ) : members.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-white/5 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider bg-white/[0.01]">
                        <th className="py-4 pl-6 pr-3">Name</th>
                        <th className="px-3 py-4">Phone</th>
                        <th className="px-3 py-4">Plan</th>
                        <th className="px-3 py-4">Status</th>
                        <th className="px-3 py-4">Due Date</th>
                        <th className="py-4 pl-3 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map(member => (
                        <tr key={member._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group text-sm">
                          <td className="py-3 pl-6 pr-3 font-medium text-white">{member.name}</td>
                          <td className="px-3 py-3 text-neutral-400">{member.phone}</td>
                          <td className="px-3 py-3 text-neutral-300 capitalize">{member.plan}</td>
                          <td className="px-3 py-3">{getStatusBadge(member.paymentStatus)}</td>
                          <td className="px-3 py-3 text-neutral-400">{new Date(member.nextDueDate).toLocaleDateString()}</td>
                          <td className="py-3 pl-3 pr-6 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => handleOpenEditModal(member)} className="p-1.5 text-neutral-500 hover:text-white hover:bg-white/10 rounded-md transition-colors"><Edit2 size={16}/></button>
                              <button onClick={() => handleDeleteMember(member._id)} className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"><Trash2 size={16}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden min-h-[400px]">
                  <div className="absolute inset-0 opacity-50 z-0" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')" }}></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#0a0a0a] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                      <Users size={28} className="text-neutral-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">No members found</h4>
                    <p className="text-neutral-500 text-sm max-w-sm mb-8 leading-relaxed">
                      {searchTerm || filter !== "all" ? "Try adjusting your search or filters to find what you're looking for." : "Your database is currently empty. Get started by securely adding your first members."}
                    </p>
                    <div className="flex items-center gap-4">
                      <button onClick={handleOpenAddModal} className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors shadow-sm">
                        <Plus size={16} /> Add Member
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            )}

          </div>
        </div>
      </main>

      {/* MODAL (ADD/EDIT MEMBER) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 selection:bg-white/20">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
             <div className="p-6 border-b border-white/5 flex justify-between items-center shrink-0">
                 <h3 className="text-lg font-bold text-white">{editingMember ? "Edit Member" : "Add New Member"}</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white transition-colors bg-white/5 p-1.5 rounded-lg border border-white/5"><X size={16}/></button>
             </div>
             
             <div className="p-6 overflow-y-auto custom-scrollbar">
               <form id="member-form" onSubmit={handleSaveMember} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Full Name</label>
                        <input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Phone Number</label>
                        <input required value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600" />
                     </div>
                     <div className="space-y-1.5 relative">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Membership Plan</label>
                        <select required value={formData.plan} onChange={e=>setFormData({...formData, plan: e.target.value})} className="w-full appearance-none bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer">
                           <option value="monthly">Monthly</option>
                           <option value="quarterly">Quarterly</option>
                           <option value="half-yearly">Half-Yearly</option>
                           <option value="yearly">Yearly</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 bottom-3.5 text-neutral-500 pointer-events-none" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Fee Amount ($)</label>
                        <input type="number" required value={formData.feeAmount} onChange={e=>setFormData({...formData, feeAmount: e.target.value})} placeholder="99" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Last Payment Date</label>
                        <input type="date" required value={formData.lastPaymentDate} onChange={e=>setFormData({...formData, lastPaymentDate: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors [color-scheme:dark]" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Next Due Date</label>
                        <input type="date" required value={formData.nextDueDate} onChange={e=>setFormData({...formData, nextDueDate: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors [color-scheme:dark]" />
                     </div>
                  </div>
               </form>
             </div>

             <div className="p-6 border-t border-white/5 flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0 bg-[#0a0a0a]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-neutral-400 bg-white/5 border border-white/5 rounded-xl hover:text-white hover:bg-white/10 transition-all">Cancel</button>
                <button type="submit" form="member-form" className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-neutral-200 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                    {editingMember ? "Save Changes" : "Create Member"}
                </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Reusable Navigation Item
function NavItem({ icon, label, active = false, onClick }) {
  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }} 
      className={`
      w-full relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group overflow-hidden
      ${active 
        ? "bg-white/10 text-white font-semibold shadow-sm" 
        : "text-neutral-400 hover:text-white hover:bg-white/5 font-medium"}
    `}>
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
      )}
      <span className={`${active ? "text-white" : "text-neutral-400 group-hover:text-white"} transition-colors relative z-10 flex shrink-0 items-center justify-center`}>
        {icon}
      </span>
      <span className="text-[14px] relative z-10 truncate">{label}</span>
    </button>
  );
}

// Reusable Stat Card
function StatCard({ label, value, trend, icon: Icon, trendCurrent = "up" }) {
  return (
    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-neutral-400">{label}</h3>
        <Icon size={18} className="text-neutral-500" />
      </div>
      
      <div className="flex items-baseline gap-3 mt-auto">
        <h2 className="text-3xl font-bold text-white tracking-tight">{value}</h2>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${
            trendCurrent === "down" 
              ? "text-red-400 bg-red-400/10 border-red-400/20" 
              : "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
          }`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

// ==========================================
// Analytics View Component
// ==========================================
const PLAN_COLORS = ["#22d3ee", "#a78bfa", "#f472b6", "#fbbf24"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const CustomTooltipStyle = {
  backgroundColor: "#111",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "10px 14px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
};

function AnalyticsView({ members, stats }) {

  // 1. Revenue / MRR Data (Area Chart)
  const revenueData = useMemo(() => {
    const now = new Date();
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = MONTHS[d.getMonth()];
      const paidInMonth = members.filter(m => {
        const payDate = new Date(m.lastPaymentDate);
        return payDate.getMonth() === d.getMonth() && payDate.getFullYear() === d.getFullYear();
      });
      const revenue = paidInMonth.reduce((sum, m) => sum + (Number(m.feeAmount) || 0), 0);
      data.push({ month: monthLabel, revenue });
    }
    // Forecast next month
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const forecastAmount = members
      .filter(m => {
        const due = new Date(m.nextDueDate);
        return due.getMonth() === nextMonth.getMonth() && due.getFullYear() === nextMonth.getFullYear();
      })
      .reduce((sum, m) => sum + (Number(m.feeAmount) || 0), 0);
    data.push({ month: MONTHS[nextMonth.getMonth()], revenue: forecastAmount, forecast: true });
    return data;
  }, [members]);

  // 2. Plan Distribution Data (Donut Chart)
  const planData = useMemo(() => {
    const counts = {};
    members.forEach(m => {
      const plan = (m.plan || "monthly").charAt(0).toUpperCase() + (m.plan || "monthly").slice(1);
      counts[plan] = (counts[plan] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [members]);

  // 3. Payment Health Data (Stacked Bar Chart)
  const paymentHealthData = useMemo(() => {
    const now = new Date();
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = MONTHS[d.getMonth()];
      let paid = 0, overdue = 0;
      members.forEach(m => {
        const payDate = new Date(m.lastPaymentDate);
        const dueDate = new Date(m.nextDueDate);
        if (payDate.getMonth() === d.getMonth() && payDate.getFullYear() === d.getFullYear()) {
          paid++;
        }
        if (dueDate < d && dueDate.getMonth() === d.getMonth() && dueDate.getFullYear() === d.getFullYear()) {
          overdue++;
        }
      });
      data.push({ month: monthLabel, Paid: paid, Overdue: overdue });
    }
    return data;
  }, [members]);

  // 4. Revenue Impact Stats
  const revenueImpact = useMemo(() => {
    const totalExpected = members
      .filter(m => m.paymentStatus === "due-soon")
      .reduce((sum, m) => sum + (Number(m.feeAmount) || 0), 0);
    const atRisk = members
      .filter(m => m.paymentStatus === "overdue")
      .reduce((sum, m) => sum + (Number(m.feeAmount) || 0), 0);
    const currentMRR = members
      .filter(m => m.paymentStatus === "paid")
      .reduce((sum, m) => sum + (Number(m.feeAmount) || 0), 0);
    return { totalExpected, atRisk, currentMRR };
  }, [members]);

  const totalPlanMembers = planData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-6 pb-4">
      
      {/* ROW 1: Revenue Impact Mini Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <MiniStatCard 
          icon={<DollarSign size={20} />}
          label="Current MRR" 
          value={`₹${revenueImpact.currentMRR.toLocaleString()}`}
          color="emerald"
        />
        <MiniStatCard 
          icon={<TrendingUp size={20} />}
          label="Expected Income" 
          value={`₹${revenueImpact.totalExpected.toLocaleString()}`}
          sublabel="From due-soon members"
          color="cyan"
        />
        <MiniStatCard 
          icon={<TrendingDown size={20} />}
          label="Revenue at Risk" 
          value={`₹${revenueImpact.atRisk.toLocaleString()}`}
          sublabel="From overdue members"
          color="red"
        />
      </div>

      {/* ROW 2: Revenue Chart + Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue / MRR Area Chart */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Revenue Overview</h3>
              <p className="text-xs text-neutral-500 mt-1">Monthly revenue trend with next month forecast</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>Revenue</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={CustomTooltipStyle} labelStyle={{ color: "#fff", fontWeight: 600 }} itemStyle={{ color: "#34d399" }} />
                <Area type="monotone" dataKey="revenue" stroke="#34d399" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ r: 4, fill: "#34d399", strokeWidth: 0 }} activeDot={{ r: 6, stroke: "#34d399", strokeWidth: 2, fill: "#0a0a0a" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Distribution Donut */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white">Plan Distribution</h3>
            <p className="text-xs text-neutral-500 mt-1">Breakdown by membership type</p>
          </div>
          {planData.length > 0 ? (
            <>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-48 h-48 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie data={planData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                        {planData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={PLAN_COLORS[idx % PLAN_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={CustomTooltipStyle} labelStyle={{ color: "#fff" }} itemStyle={{ color: "#fff" }} />
                    </RechartsPie>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{totalPlanMembers}</span>
                    <span className="text-[11px] text-neutral-500">Total</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2.5">
                {planData.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PLAN_COLORS[i % PLAN_COLORS.length] }}></span>
                      <span className="text-neutral-300">{d.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-semibold">{d.value}</span>
                      <span className="text-neutral-500 text-xs w-10 text-right">{totalPlanMembers ? Math.round((d.value / totalPlanMembers) * 100) : 0}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-neutral-500 text-sm">No members yet</p>
            </div>
          )}
        </div>
      </div>

      {/* ROW 3: Payment Health Stacked Bar Chart */}
      <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-white">Payment Health</h3>
            <p className="text-xs text-neutral-500 mt-1">Paid vs Overdue members per month</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>Paid</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>Overdue</span>
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paymentHealthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={CustomTooltipStyle} labelStyle={{ color: "#fff", fontWeight: 600 }} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="Paid" stackId="a" fill="#34d399" radius={[0, 0, 4, 4]} barSize={32} />
              <Bar dataKey="Overdue" stackId="a" fill="#f87171" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

// Mini Stat Card for Analytics
function MiniStatCard({ icon, label, value, sublabel, color = "emerald" }) {
  const colorMap = {
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-500/20",
    cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-500/20",
    red: "text-red-400 bg-red-400/10 border-red-500/20",
  };
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-white/20 transition-colors">
      <div className={`p-2.5 rounded-xl border ${colorMap[color]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-white mt-1 tracking-tight">{value}</p>
        {sublabel && <p className="text-[11px] text-neutral-500 mt-1">{sublabel}</p>}
      </div>
    </div>
  );
}

// ==========================================
// Reports View Component
// ==========================================
function ReportsView({ members }) {
  const overdueMembers = useMemo(() => members.filter(m => m.paymentStatus === "overdue"), [members]);
  const dueSoonMembers = useMemo(() => members.filter(m => m.paymentStatus === "due-soon"), [members]);

  const financialSummary = useMemo(() => {
    const summary = {};
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
      summary[monthKey] = { expected: 0, collected: 0, renewals: 0, new: 0 };
    }

    members.forEach(m => {
      const payDate = new Date(m.lastPaymentDate);
      const dueDate = new Date(m.nextDueDate);
      const payMonthKey = `${MONTHS[payDate.getMonth()]} ${payDate.getFullYear()}`;
      const dueMonthKey = `${MONTHS[dueDate.getMonth()]} ${dueDate.getFullYear()}`;

      if (summary[payMonthKey]) {
        summary[payMonthKey].collected += Number(m.feeAmount) || 0;
        summary[payMonthKey].renewals += 1; // Simplification, tracking total payments made this month
      }
      if (summary[dueMonthKey]) {
        summary[dueMonthKey].expected += Number(m.feeAmount) || 0;
      }
    });
    return Object.entries(summary).map(([month, data]) => ({ month, ...data }));
  }, [members]);

  const exportToCSV = (dataToExport, filename) => {
    const headers = ["Name,Phone,Plan,Fee Amount,Last Payment,Next Due,Status"];
    const rows = dataToExport.map(m => 
      `"${m.name}","${m.phone}","${m.plan}","${m.feeAmount}","${new Date(m.lastPaymentDate).toLocaleDateString()}","${new Date(m.nextDueDate).toLocaleDateString()}","${m.paymentStatus}"`
    );
    const csvStr = [...headers, ...rows].join("\n");
    const blob = new Blob([csvStr], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-4">
      
      {/* EXPORT ACTION BAR */}
      <div className="bg-emerald-400/10 border border-emerald-500/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div>
          <h3 className="text-emerald-400 font-bold text-lg">Export Reports</h3>
          <p className="text-emerald-400/70 text-sm mt-1">Download actionable member lists formatted neatly to CSV.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => exportToCSV(overdueMembers, "Overdue_Defaulters.csv")} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2">
            <Download size={16} /> Defaulters
          </button>
          <button onClick={() => exportToCSV(dueSoonMembers, "Upcoming_Renewals.csv")} className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2">
            <Download size={16} /> Renewals
          </button>
          <button onClick={() => exportToCSV(members, "Full_Database.csv")} className="bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2">
            <Download size={16} /> Full Database
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* OVERDUE DEFAULTERS PREVIEW */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl flex flex-col min-h-[400px]">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-red-400">Defaulter Collection List</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Contact list for overdue accounts</p>
            </div>
            <span className="text-red-400 font-bold text-sm bg-red-400/10 px-3 py-1 rounded-full">{overdueMembers.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
            {overdueMembers.length > 0 ? (
              <table className="w-full text-left whitespace-nowrap text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider bg-white/[0.01]">
                    <th className="py-3 px-5">Member</th>
                    <th className="py-3 px-5">Phone</th>
                    <th className="py-3 px-5 text-right">Since</th>
                  </tr>
                </thead>
                <tbody>
                  {overdueMembers.map(m => (
                    <tr key={m._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="py-3 px-5 text-white font-medium">{m.name}</td>
                      <td className="py-3 px-5 text-neutral-400">{m.phone}</td>
                      <td className="py-3 px-5 text-red-400 text-right">{new Date(m.nextDueDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center h-full text-neutral-500">
                <p>No defaulting members perfectly healthy!</p>
              </div>
            )}
          </div>
        </div>

        {/* UPCOMING RENEWALS PREVIEW */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl flex flex-col min-h-[400px]">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-cyan-400">Upcoming Renewals</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Expiring in the coming weeks</p>
            </div>
            <span className="text-cyan-400 font-bold text-sm bg-cyan-400/10 px-3 py-1 rounded-full">{dueSoonMembers.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
            {dueSoonMembers.length > 0 ? (
              <table className="w-full text-left whitespace-nowrap text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider bg-white/[0.01]">
                    <th className="py-3 px-5">Member</th>
                    <th className="py-3 px-5">Phone</th>
                    <th className="py-3 px-5 text-right">Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {dueSoonMembers.map(m => (
                    <tr key={m._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="py-3 px-5 text-white font-medium">{m.name}</td>
                      <td className="py-3 px-5 text-neutral-400">{m.phone}</td>
                      <td className="py-3 px-5 text-cyan-400 text-right">{new Date(m.nextDueDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center h-full text-neutral-500">
                <p>No upcoming renewals.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MONTHLY FINANCIAL SUMMARY */}
      <div className="bg-white/[0.02] border border-white/10 rounded-xl">
        <div className="p-5 border-b border-white/5">
          <h3 className="text-base font-semibold text-white">Monthly Financial Summary</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Last 6 months trailing accounting</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap text-sm">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider bg-white/[0.01]">
                <th className="py-4 px-6">Billing Month</th>
                <th className="py-4 px-6 text-right">Payments Tracked</th>
                <th className="py-4 px-6 text-right">Expected Revenue</th>
                <th className="py-4 px-6 text-right text-emerald-400">Total Collected</th>
                <th className="py-4 px-6 text-right">Difference</th>
              </tr>
            </thead>
            <tbody>
              {financialSummary.map((data, idx) => {
                const diff = data.collected - data.expected;
                return (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-4 px-6 text-white font-semibold">{data.month}</td>
                    <td className="py-4 px-6 text-neutral-400 text-right">{data.renewals} Payments</td>
                    <td className="py-4 px-6 text-neutral-300 text-right">₹{data.expected.toLocaleString()}</td>
                    <td className="py-4 px-6 text-emerald-400 font-bold text-right">₹{data.collected.toLocaleString()}</td>
                    <td className={`py-4 px-6 text-right font-medium ${diff >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {diff >= 0 ? "+" : ""}
                      {diff === 0 ? "-" : `₹${Math.abs(diff).toLocaleString()}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
