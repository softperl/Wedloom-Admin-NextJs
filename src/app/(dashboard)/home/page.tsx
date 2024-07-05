import UserListCards from "../users/UserListCards";
import BlogListCards from "../blogs/UserListCards";
import QuestionListCards from "../question/UserListCards";
import VendorListCards from "../vendors/UserListCards";
import ReportsListCards from "../reports/UserListCards";
import MembershipListCards from "../membership/UserListCards";
import PlanListCards from "../membership/plan/UserListCards";
import MarketplaceListCards from "../cards/marketplace/UserListCards";
import CardsListCards from "../cards/UserListCards";
import CardsFontsListCards from "../cards/fonts/UserListCards";
import ContactListCards from "../contact/UserListCards";

const DashboardAnalytics = async () => {
  return (
    <div className="flex flex-col gap-6">
      <BlogListCards />
      <QuestionListCards />
      <UserListCards />
      <VendorListCards />
      <ReportsListCards />
      <MembershipListCards />
      <PlanListCards />
      <MarketplaceListCards />
      <CardsListCards />
      <CardsFontsListCards />
      <ContactListCards />
    </div>
  );
};

export default DashboardAnalytics;
