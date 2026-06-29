import './FilterBox.css';

const FilterBox = ({
    filterType,
    isActive,
    onClick,
    size = "default"
}) => {
    return (
        <button
            className={`
                FilterBox
                ${isActive ? "active" : ""}
                ${size === "small" ? "small" : ""}
            `}
            onClick={onClick}
        >
            <p>{filterType}</p>
        </button>
    );
};

export default FilterBox;