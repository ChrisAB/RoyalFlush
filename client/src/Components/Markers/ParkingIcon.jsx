import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Badge } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const badgeStyle = {
    "& .MuiBadge-badge": {
      backgroundColor: "gray",
    }
  }

export const ParkingIcon = ({freeSpots, parkingCategory}) => {
    return <>
        <Badge badgeContent={freeSpots} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }} sx={badgeStyle} >
            <DirectionsCarIcon fontSize='large'  sx={{ color: parkingCategory }}/>
        </Badge>
    </>
}