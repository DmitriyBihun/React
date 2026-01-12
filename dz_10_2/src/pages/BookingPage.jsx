import ItemCard from '../components/ItemCard.jsx';
import { useBooking } from "../context/BookingContext";

function BookingPage() {

    const { selectedBuses, selectedHotels, removeBus, removeHotel, chooseByAgency, finalBus, finalHotel } = useBooking()

    return (
        <div className='grid'>
            <div>
                <h3>Обрані автобуси:</h3>

                {selectedBuses.length === 0 && <p><strong>Автобуси не обрані.</strong></p>}

                {selectedBuses.map(bus => (
                    <ItemCard key={bus.id}
                        image={bus.image}
                        name={bus.name}
                        type={bus.type}
                        showRemove
                        onRemove={() => removeBus(bus.id)}
                    />
                ))}
            </div>

            <div>
                <h3>Обрані готелі:</h3>

                {selectedHotels.length === 0 && <p><strong>Готелі не обрані</strong></p>}

                {selectedHotels.map(hotel => (
                    <ItemCard key={hotel.id}
                        image={hotel.image}
                        name={hotel.name}
                        type={hotel.type}
                        showRemove
                        onRemove={() => removeHotel(hotel.id)}
                    />
                ))}
            </div>

            <div>
                <button onClick={chooseByAgency}>Турфірма рекомендує</button>
            </div>

            <div>
                <h3>Рекомендація:</h3>

                {finalBus && (
                    <div>
                        <h4>Обраний автобус:</h4>
                        <ItemCard
                            image={finalBus.image}
                            name={finalBus.name}
                            type={finalBus.type}
                            showToggle={false}
                            showRemove={false}
                        />
                    </div>
                )}
                {finalHotel && (
                    <div>
                        <h4>Обраний готель:</h4>
                        <ItemCard
                            image={finalHotel.image}
                            name={finalHotel.name}
                            type={finalHotel.type}
                            extra={`Rooms: ${finalHotel.rooms}`}
                            showToggle={false}
                            showRemove={false}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookingPage;