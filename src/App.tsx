import { useState, useEffect } from "react";
import { HomePage } from "./components/HomePage";
import { CoursesPage } from "./components/CoursesPage";
import { CourseDetailPage } from "./components/CourseDetailPage";
import { ResourcesPage } from "./components/ResourcesPage";
import { ProfilePage } from "./components/ProfilePage";
import { BottomNav } from "./components/BottomNav";
import LoginPage from "./components/LoginPage";
import { KnowledgePointPage } from "./components/KnowledgePointPage";
import { isLoggedIn, getCurrentUser } from "./utils/auth";
import { startSession, endSession } from "./utils/statistics";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  // Start session when logged in
  useEffect(() => {
    if (loggedIn) {
      const user = getCurrentUser();
      if (user) {
        startSession(user.username, user.name);
      }
    }

    // End session on unmount or logout
    return () => {
      if (loggedIn) {
        endSession();
      }
    };
  }, [loggedIn]);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Show login page if not logged in
  if (!loggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  const renderPage = () => {
    // 检查是否是知识点页面（格式：knowledge-MF01-M01-1-1.1.1）
    if (currentPage.startsWith("knowledge-")) {
      const parts = currentPage.replace("knowledge-", "").split("-");
      const mfId = parts[0]; // MF01
      const moduleId = parts[1]; // M01
      const knowledgeId = parts.slice(2).join("-"); // 1-1.1.1
      console.log('Rendering knowledge page:', { currentPage, mfId, moduleId, knowledgeId });
      return (
        <KnowledgePointPage
          onNavigate={handleNavigate}
          mfId={mfId}
          moduleId={moduleId}
          knowledgeId={knowledgeId}
        />
      );
    }

    // 检查是否是课程详情页（格式：course-detail-MF01）
    if (currentPage.startsWith("course-detail-")) {
      const courseId = currentPage.replace("course-detail-", "");
      return <CourseDetailPage onNavigate={handleNavigate} courseId={courseId} />;
    }

    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "courses":
        return <CoursesPage onNavigate={handleNavigate} />;
      case "course-detail":
        return <CourseDetailPage onNavigate={handleNavigate} />;
      case "resources":
        return <ResourcesPage onNavigate={handleNavigate} />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const showBottomNav = ["home", "courses", "resources", "profile"].includes(
    currentPage
  );

  return (
    <div className="relative min-h-screen bg-background">
      {renderPage()}
      {showBottomNav && (
        <BottomNav activePage={currentPage} onNavigate={handleNavigate} />
      )}
    </div>
  );
}