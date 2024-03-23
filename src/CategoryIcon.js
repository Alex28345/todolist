import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import AppleIcon from '@mui/icons-material/Apple';
import BugReportIcon from '@mui/icons-material/BugReport';
import ComputerIcon from '@mui/icons-material/Computer';

function CategoryIcon({ category }) {
    switch (category) {
        case 'Home':
            return <HomeIcon />;
        case 'Work':
            return <WorkIcon />;
        case 'Apple':
            return <AppleIcon />;
        case 'Bug':
            return <BugReportIcon />;
        case 'Computer':
            return <ComputerIcon />;
        default:
            return null;
    }
}
export default CategoryIcon;