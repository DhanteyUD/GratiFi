import { NavLink } from "react-router-dom";
import { getScreenMenuItems } from "@/routes/path";
import { UseAppContext } from "@/hooks/UseAppContext";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = UseAppContext();

  console.log({ user });

  //   if (!userType) {
  //     return (
  //       <div className="p-4 text-red-600">
  //         User type not set. Please{" "}
  //         <Link to="/select-role" className="underline">
  //           select a role
  //         </Link>
  //         .
  //       </div>
  //     );
  //   }

  //   const items = getScreenMenuItems(userType);
  const items = getScreenMenuItems("GratiFan");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-2">
        <h1 className="text-xl font-bold mb-6">GratiFi</h1>
        <nav className="space-y-2">
          {items.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default SidebarLayout;
