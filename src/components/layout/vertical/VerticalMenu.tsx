"use client";

// MUI Imports
import { useTheme } from "@mui/material/styles";

// Third-party Imports
import PerfectScrollbar from "react-perfect-scrollbar";

// Type Imports
import type { VerticalMenuContextProps } from "@menu/components/vertical-menu/Menu";

// Component Imports
import { Menu, MenuItem, SubMenu } from "@menu/vertical-menu";

// Hook Imports
import { useSettings } from "@core/hooks/useSettings";
import useVerticalNav from "@menu/hooks/useVerticalNav";

// Styled Component Imports
import StyledVerticalNavExpandIcon from "@menu/styles/vertical/StyledVerticalNavExpandIcon";

// Style Imports
import menuItemStyles from "@core/styles/vertical/menuItemStyles";
import menuSectionStyles from "@core/styles/vertical/menuSectionStyles";

type RenderExpandIconProps = {
  open?: boolean;
  transitionDuration?: VerticalMenuContextProps["transitionDuration"];
};

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void;
};

const RenderExpandIcon = ({
  open,
  transitionDuration,
}: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon
    open={open}
    transitionDuration={transitionDuration}>
    <i className="tabler-chevron-right" />
  </StyledVerticalNavExpandIcon>
);

const VerticalMenu = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme();
  const verticalNavOptions = useVerticalNav();
  const { settings } = useSettings();
  const { isBreakpointReached } = useVerticalNav();

  // Vars
  const { transitionDuration } = verticalNavOptions;

  const ScrollWrapper = isBreakpointReached ? "div" : PerfectScrollbar;

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: "bs-full overflow-y-auto overflow-x-hidden",
            onScroll: (container) => scrollMenu(container, false),
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: (container) => scrollMenu(container, true),
          })}>
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => (
          <RenderExpandIcon
            open={open}
            transitionDuration={transitionDuration}
          />
        )}
        renderExpandedMenuItemIcon={{
          icon: <i className="tabler-circle text-xs" />,
        }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}>
        <MenuItem href="/home" icon={<i className="tabler-smart-home" />}>
          Home
        </MenuItem>
        <SubMenu label={"Blogs"} icon={<i className="tabler-brand-blogger" />}>
          <MenuItem href={`/blogs`}>All Blogs</MenuItem>
          <MenuItem href={`/blogs/new`}>Add New</MenuItem>
          <MenuItem href={`/blogs/categories`}>Categories</MenuItem>
          <MenuItem href={`/author`}>Author</MenuItem>
        </SubMenu>
        <SubMenu
          label={"Question"}
          icon={<i className="tabler-question-mark" />}>
          <MenuItem href={`/question`}>All Question</MenuItem>
          <MenuItem href={`/question/new`}>Add New</MenuItem>
        </SubMenu>
        <SubMenu label={"All Users"} icon={<i className="tabler-users" />}>
          <MenuItem href={`/users`}>Users</MenuItem>
          <MenuItem href={`/vendors`}>Vendors</MenuItem>
          <MenuItem href={`/reports`}>Reports</MenuItem>
        </SubMenu>
        <MenuItem href="/approval" icon={<i className="tabler-user-check" />}>
          Approval
        </MenuItem>
        <SubMenu
          label={"Membership"}
          icon={<i className="tabler-users-group" />}>
          <MenuItem href={`/membership`}>All Membership</MenuItem>
          <MenuItem href={`/membership/plan`}>Plan</MenuItem>
        </SubMenu>
        <SubMenu label={"Cards"} icon={<i className="tabler-cards" />}>
          <MenuItem href={`/cards/marketplace`}>Marketplace</MenuItem>
          <MenuItem href={`/cards`}>All Cards</MenuItem>
          <MenuItem href={`/cards/new`}>Add Card</MenuItem>
          <MenuItem href={`/cards/categories`}>Categories</MenuItem>
          <MenuItem href={`/cards/fonts`}>Card Fonts</MenuItem>
        </SubMenu>
        <SubMenu label={"Contact Us"} icon={<i className="tabler-headset" />}>
          <MenuItem href="/contact">All List</MenuItem>
          <MenuItem href="/contact/info">Contact Info</MenuItem>
          <MenuItem href="/contact/maps">Maps</MenuItem>
        </SubMenu>
        <SubMenu label={"Settings"} icon={<i className="tabler-settings" />}>
          <MenuItem href={`/vendorcategory`}>Vendor Category</MenuItem>
          <MenuItem href={`/city`}>Add City</MenuItem>
          <MenuItem href={`/checklist`}>User Checklist</MenuItem>
          <MenuItem href={`/site-about`}>Site About</MenuItem>
          <MenuItem href={`/worksteps`}>Work Steps</MenuItem>
        </SubMenu>
        <SubMenu label={"Appearance"} icon={<i className="tabler-grid-dots" />}>
          <MenuItem href={`/social-media`}>Social Media</MenuItem>
          <MenuItem href={`/header-menu`}>Header Menu</MenuItem>
          <MenuItem href={`/footer-menu`}>Footer Menu</MenuItem>
          <MenuItem href={`/site-logo`}>Site Logo</MenuItem>
        </SubMenu>
        <SubMenu
          label={"Terms & Condition"}
          icon={<i className="tabler-info-circle" />}>
          <MenuItem href={`/terms`}>Terms</MenuItem>
          <MenuItem href={`/policy`}>Privacy Policy</MenuItem>
          <MenuItem href={`/refund`}>Refund Policy</MenuItem>
        </SubMenu>
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary, params)} />
      </Menu> */}
    </ScrollWrapper>
  );
};

export default VerticalMenu;
