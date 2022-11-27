import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Badge } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';



// const carStyle = {
//   "& .MuiSvgIcon-root": {
//     backgroundColor: "green",
//   }
// }
export const getCarColor = (percentage) => {
    let color = "#FF4500";
    if (percentage >= 0.5 ) {
        color = "#66FF99"
    } 
    if (percentage >= 0.25 && percentage < 0.5) {
        color="#FFFF66"
    }
    return color
}

const badgeStyle = {
    "& .MuiBadge-badge": {
      backgroundColor: "gray",
    }
  }

export const ParkingIcon = ({freeSpots, parkingSpots}) => {
    const percentage = parkingSpots.numberOfFreeSpots / parkingSpots.totalNumberOfSpots;
    const carColor = getCarColor(percentage);
    console.log(freeSpots);
    return <>
        <Badge badgeContent={freeSpots ? freeSpots : "0" } anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }} sx={{
            "& .MuiBadge-badge": {
              backgroundColor: carColor
            }
          }}>
            <DirectionsCarIcon fontSize='large'  />
        </Badge>
    </>
}

// sx={{ color: parkingCategory }}