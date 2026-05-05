import './FilterBox.css';

const FilterBox = ({ filterType, isActive, onClick }) => {
    return (
        <button
            className={`FilterBox ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            <p>{filterType}</p>
        </button>
    );
}

export default FilterBox;