import './styles.css';

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const WeekDays = () => {
  return (
    <div className="calendar-grid-layout">
      {days.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
};

export default WeekDays;
