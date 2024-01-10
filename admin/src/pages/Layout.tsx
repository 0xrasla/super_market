import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className='flex w-screen h-screen'>
      <Sidebar />
      <div className='flex flex-col gap-2 w-full bg-gray-100'>
        <Topbar />
        {children}
      </div>
    </div>
  );
}
