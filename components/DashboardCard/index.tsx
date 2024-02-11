import  Link  from "next/link";
import Image from "next/image";

const DashboardCard = ({ icon, title, link, children }) => {
  return (
    <Link href={link} className="rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            {icon}
          </div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        {children}
      </div>
    </Link>
  );
};

export default DashboardCard;