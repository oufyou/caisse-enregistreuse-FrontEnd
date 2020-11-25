import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import GradeTwoTone from '@material-ui/icons/GradeTwoTone';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import AuthenticationService from '../../service/AuthenticationService';

var iconsMap = {
  BarChartIcon: BarChartIcon,
  CalendarTodayIcon: CalendarTodayIcon,
  ChatIcon: ChatIcon,
  CodeIcon: CodeIcon,
  DashboardIcon: DashboardIcon,
  ErrorIcon: ErrorIcon,
  FolderIcon: FolderIcon,
  DashboardTwoToneIcon: DashboardTwoToneIcon,
  GradeTwoTone: GradeTwoTone,
  ListAltIcon: ListAltIcon,
  LockOpenIcon: LockOpenIcon,
  MailIcon: MailIcon,
  PresentToAllIcon: PresentToAllIcon,
  PeopleIcon: PeopleIcon,
  PersonIcon: PersonIcon,
  ReceiptIcon: ReceiptIcon,
  SettingsIcon: SettingsIcon,
  ViewModuleIcon: ViewModuleIcon
};
const roles = AuthenticationService.getLoggedInRoles();
let menu = `[
  {
    "label": "Point de vente",
    "icon": "DashboardIcon",
    "to": "/DashboardDefault"
  }]`;
if (roles.includes('ROLE_ADMIN')) {
  menu = `[
  {
    "label": "Point de vente",
    "icon": "DashboardIcon",
    "to": "/DashboardDefault"
  },
  {
    "label": "Gestion des categories",
    "icon": "DashboardTwoToneIcon",
    "to": "/Categories"
  },
    {
    "label": "Gestion des sous catégories",
    "icon": "DashboardTwoToneIcon",
    "to": "/SubCategories"
  },
      {
    "label": "Gestion des produits",
    "icon": "DashboardTwoToneIcon",
    "to": "/Products"
  }
  ,
      {
    "label": "Gestion des utilisateurs",
    "icon": "DashboardTwoToneIcon",
    "to": "/Users"
  },
      {
    "label": "Gestion des clients",
    "icon": "DashboardTwoToneIcon",
    "to": "/Customers"
  },
    {
    "label": "Gestion des caissiers",
    "icon": "DashboardTwoToneIcon",
    "to": "/Cashiers"
  },
    {
    "label": "Historique des ventes",
    "icon": "DashboardTwoToneIcon",
    "to": "/Sales"
  },
    {
    "label": "Historique des paiements",
    "icon": "DashboardTwoToneIcon",
    "to": "/Payments"
  },
    {
    "label": "Ticket X",
    "icon": "DashboardTwoToneIcon",
    "to": "/TicketX"
  },
    {
    "label": "Ticket Z",
    "icon": "DashboardTwoToneIcon",
    "to": "/TicketZ"
  }
]`;
} else if (roles.includes('ROLE_CASHIER')) {
  menu = `[
  {
    "label": "Point de vente",
    "icon": "DashboardIcon",
    "to": "/DashboardDefault"
  },
    {
    "label": "Historique des ventes",
    "icon": "DashboardTwoToneIcon",
    "to": "/Sales"
  },
    {
    "label": "Historique des paiements",
    "icon": "DashboardTwoToneIcon",
    "to": "/Payments"
  },   {
    "label": "Ticket X",
    "icon": "DashboardTwoToneIcon",
    "to": "/TicketX"
  },
]`;
}
export default [
  {
    label: 'Navigation menu',
    content: JSON.parse(menu, (key, value) => {
      if (key === 'icon') {
        return iconsMap[value];
      } else {
        return value;
      }
    })
  }
];
