import ItemCard from '../components/ItemCard.jsx';
import { useBooking } from '../context/BookingContext';
import { buses } from '../data/busList.js'

function BusPage() {

    const { addBus, selectedBuses } = useBooking()

    return (
        <div className='grid'>
            {buses.map(bus => (
                <ItemCard key={bus.id}
                    image={bus.image}
                    name={bus.name}
                    type={bus.type}
                    isSelected={
                        selectedBuses.some(b => b.id === bus.id)
                    }
                    onToggle={() => addBus(bus)}
                />
            ))}
        </div>
    );
}

export default BusPage;