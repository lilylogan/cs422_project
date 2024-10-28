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
  };
  