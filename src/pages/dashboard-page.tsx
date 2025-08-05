import StatCard from "./components/stat-card";

export default function Dashboard() {
  // mock data
  const stats = {
    views: 1284,
    couponsUsed: 96,
    totalCoupons: 150,
    uniqueUsers: 73,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="จำนวนการดูร้าน" value={stats.views.toLocaleString()} />
        <StatCard title="คูปองถูกใช้แล้ว" value={`${stats.couponsUsed} ใบ`} />
        <StatCard title="คูปองทั้งหมด" value={`${stats.totalCoupons} ใบ`} />
        <StatCard
          title="ผู้ใช้งานที่ใช้คูปอง"
          value={`${stats.uniqueUsers} คน`}
        />
      </div>

      {/* เพิ่ม chart หรือ table ได้ภายหลัง */}
    </div>
  );
}
