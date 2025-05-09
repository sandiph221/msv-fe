import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

// Pages
import LoginPage from "./Pages/Login/Login";
import RegisterPage from "./Pages/Register/Register";
import CardDetailPage from "./Pages/Register/CardDetail";
import ChangePasswordFromMail from "./Pages/ChangePasswordFromMail/ChangePasswordFromMail";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import ProfilePage from "./Pages/Profile/Profile";
import ContentNewsFeedPage from "./Pages/ContentNewsfeed/ContentNewsFeed";
import UserManagementPage from "./Pages/UserManagement/UserManagement";
import SubscriptionSetting from "./Pages/SubscriptionManagementSetting/SubscriptionSetting";
import CreatePlan from "./Pages/SubscriptionManagementSetting/CreatePlan";
import EditPlan from "./Pages/SubscriptionManagementSetting/EditPlan";
import SubscriptionDetail from "./Pages/SubscriptionManagementSetting/SubscriptionDetail";
import UpgradePlan from "./Pages/SubscriptionManagementSetting/Upgrade";
import AccountManagement from "./Pages/AccountManagement/AccountManagement";
import CustomerAdminSetting from "./Pages/CustomerAdminSetting/CustomerAdminSetting";
import ContentManagement from "./Pages/ContentManagement/ContentManagement";
import NewPage from "./Pages/NewPage/NewPage";
import FAQ from "./Pages/FAQ/FAQ";
import SocialListeningPage from "./Pages/SocialListeningPage/SocialListeningPage";
import ComparisonPage from "./Pages/ComparisionPage/ComparisonPage";
import ProfileListingPage from "./Pages/ProfileListingPage/ProfileListingPage";
import ProfileOverview from "./Pages/ProfileListingPage/ProfileOverview";
import PaymentVerifyPage from "./Pages/PaymentPage/VerificationPage";
import PaymentCancelPage from "./Pages/PaymentPage/CancellationPage";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Help from "./Pages/Help/Help";
import HelpPageDoucment from "./Pages/Help/HelpPageDoucment";
import HelpPageFaq from "./Pages/Help/HelpPageFaq";
import HelpPageVideo from "./Pages/Help/HelpPageVideo";
import AdminDashboardPage from "./Admin/Pages/AdminDashboardPage";
import Analytics from "./Admin/Pages/Analytics/Analytics";
import { ContactSupport } from "./Admin/Pages/ContactSupport/ContactSupport";
import UserActivity from "./Admin/Pages/UserActivity/UserActivity";
import Homepage from "./Pages/Web/Homepage";
import { ChangePassword } from "./store/actions/AuthAction";

// Auth protection components
const PrivateLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  const router = createBrowserRouter([
    // Public Routes
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/card-details",
      element: <CardDetailPage />,
    },
    {
      path: "/changes-password",
      element: <ChangePassword />,
    },
    {
      path: "/change-password-from-mail",
      element: <ChangePasswordFromMail />,
    },
    {
      path: "/payment/verify",
      element: <PaymentVerifyPage />,
    },
    {
      path: "/payment/cancel",
      element: <PaymentCancelPage />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },

    // Private Routes
    {
      element: <PrivateLayout />,
      children: [
        {
          path: "/user-dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/brand-overview",
          element: <ProfileOverview />,
        },
        {
          path: "/comparision",
          element: <ProfileListingPage />,
        },
        {
          path: "/profile-comparison",
          element: <ComparisonPage />,
        },
        {
          path: "/social-listening",
          element: <SocialListeningPage />,
        },
        {
          path: "/content-newsfeed",
          element: <ContentNewsFeedPage />,
        },
        {
          path: "/help/faq",
          element: <HelpPageFaq />,
        },
        {
          path: "/help/how-to-document",
          element: <HelpPageDoucment />,
        },
        {
          path: "/help/videos",
          element: <HelpPageVideo />,
        },
      ],
    },

    // Admin Routes
    {
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/dashboard",
          element: <AdminDashboardPage />,
        },
        {
          path: "/admin/user-activity",
          element: <UserActivity />,
        },
        {
          path: "/contact-support",
          element: <ContactSupport />,
        },
        {
          path: "/admin/analytics",
          element: <Analytics />,
        },
        {
          path: "/subscription-management",
          element: <SubscriptionSetting />,
        },
        {
          path: "/subscription-details",
          element: <SubscriptionDetail />,
        },
        {
          path: "/plan/create",
          element: <CreatePlan />,
        },
        {
          path: "/plan/:id",
          element: <EditPlan />,
        },
        {
          path: "/account-management",
          element: <AccountManagement />,
        },
        {
          path: "/upgrade",
          element: <UpgradePlan />,
        },
        {
          path: "/user-management",
          element: <UserManagementPage />,
        },
        {
          path: "/cms",
          element: <ContentManagement />,
        },
        {
          path: "/cms/page/new",
          element: <NewPage />,
        },
        {
          path: "/cms/page/:id/edit",
          element: <NewPage />,
        },
        {
          path: "/cms/faq/new",
          element: <FAQ />,
        },
        {
          path: "/cms/faq/:id/edit",
          element: <FAQ />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/customer-admin-setting",
          element: <CustomerAdminSetting />,
        },
        {
          path: "/help",
          element: <Help />,
        },
      ],
    },

    // Catch-all Route
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
