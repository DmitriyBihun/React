import ItemCard from '../components/ItemCard.jsx';
import { useBooking } from '../context/BookingContext';
import { hotels } from '../data/hotelList.js'

function HotelPage() {

    const { addHotel, selectedHotels } = useBooking()

    return (
        <div className='grid'>
            {hotels.map(hotel => (
                <ItemCard key={hotel.id}
                    image={hotel.image}
                    name={hotel.name}
                    type={hotel.type}
                    extra={`Available rooms: ${hotel.rooms}`}
                    isSelected={
                        selectedHotels.some(h => h.id === hotel.id)
                    }
                    onToggle={() => addHotel(hotel)}
                />
            ))}
        </div>
    );
}

export default HotelPage;