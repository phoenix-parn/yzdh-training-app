import { Home, BookOpen, FolderOpen, User } from "lucide-react";

interface BottomNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function BottomNav({ activePage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "home", label: "首页", icon: Home },
    { id: "courses", label: "课程", icon: BookOpen },
    { id: "resources", label: "资料库", icon: FolderOpen },
    { id: "profile", label: "我的", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-1 hover:bg-[#F5F5F5] transition-colors"
            >
              <item.icon
                className={`h-5 w-5 ${
                  isActive ? "text-primary" : "text-[#999999]"
                }`}
              />
              <span
                className={`text-[12px] ${
                  isActive ? "text-primary" : "text-[#999999]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
