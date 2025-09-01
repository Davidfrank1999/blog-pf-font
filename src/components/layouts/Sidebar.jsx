import { Home, FileText, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 border-r bg-background p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Zaalima</h1>

      <nav className="flex-1 space-y-2">
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link to="/dashboard"><Home className="mr-2 h-4 w-4"/> Dashboard</Link>
        </Button>
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link to="/posts"><FileText className="mr-2 h-4 w-4"/> Posts</Link>
        </Button>
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link to="/settings"><Settings className="mr-2 h-4 w-4"/> Settings</Link>
        </Button>
      </nav>

      <Button variant="destructive" className="mt-auto justify-start">
        <LogOut className="mr-2 h-4 w-4"/> Logout
      </Button>
    </aside>
  );
};

export default Sidebar;
