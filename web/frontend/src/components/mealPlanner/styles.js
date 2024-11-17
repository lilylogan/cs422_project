import { THEME } from '../../constants/theme';

export const styles = {
  container: {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '1rem',
  },
  section: {
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem',
    color: 'white',
  },
  expandButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '9999px',
    width: '32px',
    height: '32px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHeader: {
    padding: '0.0001rem 1rem',
    backgroundColor: THEME.background,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
  },
  meal: {
    padding: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderTop: `1px solid ${THEME.border}`,
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    color: 'white',
  },
  verticalContainer: {
    display: 'block',
    '@media screen and (minWidth: 1024px)': {
      display: 'none',
    }
  }
};

export const calendarStyles = {
  calendarContainer: {
    display: 'block',
    width: '100%',
    '@media screen and (maxWidth: 1023px)': {
      display: 'none',
    },
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.25rem',
    paddingBottom: '1rem', 
    margin: '1rem'
  },
  dayHeader: {
    textAlign: 'center',
    fontWeight: '600',
    padding: '0.5rem',
    backgroundColor: THEME.background,
    borderTopLeftRadius: '0.375rem',
    borderTopRightRadius: '0.375rem',
    borderRadius: '.4rem'
  },
  dayCell: {
    borderRadius: '0.375rem',
    padding: '0.5rem',
    minHeight: '20px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: THEME.background
  },
  mealCard: {
    marginBottom: '0.5rem',
    padding: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '0.375rem',
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.5)',
    transition: 'box-shadow 0.2s',
  },
  mealCardHover: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 1)',
  },
  mealHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.25rem',
  },
  mealTitle: {
    fontWeight: '500',
  },
  mealFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '0.875rem',
  },
  removeButton: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9ca3af',
    padding: '0.25rem',
  },
  removeButtonHover: {
    color: '#4b5563',
  }
};