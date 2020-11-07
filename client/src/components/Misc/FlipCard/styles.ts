import createStyles from '@material-ui/core/styles/createStyles';

const flipCardStyles = createStyles({
  card: {
    perspective: '150rem',
    MozPerspective: '150rem',
    position: 'relative',
    height: '20rem',
    '&:hover': {
      '& $card_side_front': {
        transform: 'rotateY(-180deg)',
      },
      '& $card_side_back': {
        transform: 'rotateY(0)',
      },
    },
  },
  card_side: {
    height: '20rem',
    transition: 'all 0.8s ease',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '3px',
    overflow: 'hidden',
    boxShadow: '0 1.5rem 4rem rgba($color-black, 0.15)',
  },
  card_side_front: {
    backgroundColor: '#fff',
  },
  card_side_back: {
    transform: 'rotateY(180deg)',
    backgroundImage: 'linear-gradient(60deg, #113b5e, rgba(6,119,161, 0))',
  },
  card_picture: {
    backgroundSize: 'cover',
    height: '5rem',
    backgroundBlendMode: 'color',
    WebkitClipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
    backgroundImage: 'linear-gradient(60deg, #113b5e, rgba(6,119,161, 0))',
  },
  card_heading: {
    fontSize: '1rem',
    textAlign: 'left',
    color: '#fff',
    position: 'absolute',
    top: 0,
    left: '2rem',
    width: '100%',
    minHeight: 'auto',
    fontWeight: 300,
    textDecoration: 'none',
    '& small': {
      color: '#999',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  card_details: {
    padding: '2rem',
  },
  ul: {
    listStyle: 'none',
    width: '100%',
    margin: '0 auto',
    padding: '2rem',
  },
  li: {
    textAlign: 'center',
    fontSize: '1rem',
    padding: '0.4rem',
  },
  card_cta: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    textAlign: 'center',
  },
  card_price_box: {
    textAlign: 'center',
    marginBottom: '8rem',
    color: '#fff',
  },
  card_price_only: {
    fontSize: '1.4rem',
    textTransform: 'uppercase',
  },
  card_price_value: {
    fontSize: '6rem',
    fontWeight: 300,
  },
  img: {
    width: '50rem',
    height: '20rem',
    objectFit: 'cover',
  },
});

export default flipCardStyles;
