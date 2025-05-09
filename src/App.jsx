import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

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

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user && user.isAdmin ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/card-details" element={<CardDetailPage />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route
        path="/change-password-from-mail"
        element={<ChangePasswordFromMail />}
      />
      <Route path="/payment/verify" element={<PaymentVerifyPage />} />
      <Route path="/payment/cancel" element={<PaymentCancelPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      {/* Private Routes */}
      <Route
        path="/user-dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/brand-overview"
        element={
          <PrivateRoute>
            <ProfileOverview />
          </PrivateRoute>
        }
      />
      <Route
        path="/comparision"
        element={
          <PrivateRoute>
            <ProfileListingPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile-comparison"
        element={
          <PrivateRoute>
            <ComparisonPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/social-listening"
        element={
          <PrivateRoute>
            <SocialListeningPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/content-newsfeed"
        element={
          <PrivateRoute>
            <ContentNewsFeedPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/help/faq"
        element={
          <PrivateRoute>
            <HelpPageFaq />
          </PrivateRoute>
        }
      />
      <Route
        path="/help/how-to-document"
        element={
          <PrivateRoute>
            <HelpPageDoucment />
          </PrivateRoute>
        }
      />
      <Route
        path="/help/videos"
        element={
          <PrivateRoute>
            <HelpPageVideo />
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/user-activity"
        element={
          <AdminRoute>
            <UserActivity />
          </AdminRoute>
        }
      />
      <Route
        path="/contact-support"
        element={
          <AdminRoute>
            <ContactSupport />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        }
      />
      <Route
        path="/subscription-management"
        element={
          <AdminRoute>
            <SubscriptionSetting />
          </AdminRoute>
        }
      />
      <Route
        path="/subscription-details"
        element={
          <AdminRoute>
            <SubscriptionDetail />
          </AdminRoute>
        }
      />
      <Route
        path="/plan/create"
        element={
          <AdminRoute>
            <CreatePlan />
          </AdminRoute>
        }
      />
      <Route
        path="/plan/:id"
        element={
          <AdminRoute>
            <EditPlan />
          </AdminRoute>
        }
      />
      <Route
        path="/account-management"
        element={
          <AdminRoute>
            <AccountManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/upgrade"
        element={
          <AdminRoute>
            <UpgradePlan />
          </AdminRoute>
        }
      />
      <Route
        path="/user-management"
        element={
          <AdminRoute>
            <UserManagementPage />
          </AdminRoute>
        }
      />
      <Route
        path="/cms"
        element={
          <AdminRoute>
            <ContentManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/cms/page/new"
        element={
          <AdminRoute>
            <NewPage />
          </AdminRoute>
        }
      />
      <Route
        path="/cms/page/:id/edit"
        element={
          <AdminRoute>
            <NewPage />
          </AdminRoute>
        }
      />
      <Route
        path="/cms/faq/new"
        element={
          <AdminRoute>
            <FAQ />
          </AdminRoute>
        }
      />
      <Route
        path="/cms/faq/:id/edit"
        element={
          <AdminRoute>
            <FAQ />
          </AdminRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AdminRoute>
            <ProfilePage />
          </AdminRoute>
        }
      />
      <Route
        path="/customer-admin-setting"
        element={
          <AdminRoute>
            <CustomerAdminSetting />
          </AdminRoute>
        }
      />
      <Route
        path="/help"
        element={
          <AdminRoute>
            <Help />
          </AdminRoute>
        }
      />

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
