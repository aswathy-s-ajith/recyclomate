import React from 'react';
import { Link } from 'react-router-dom';

// Import all images from the assets folder
import logo from '../assets/logo.png';
import recycleHero from '../assets/recyclehero.png';
import step1 from '../assets/step1.png';
import step2 from '../assets/step2.png';
import step3 from '../assets/step3.png';
import impact1 from '../assets/impact1.png';
import impact2 from '../assets/impact2.png';
import impact3 from '../assets/impact3.png';
import rev1 from '../assets/rev1.png'; // New review image
import rev2 from '../assets/rev2.png'; // New review image
import rev3 from '../assets/rev3.png'; // New review image

const styles = {
  // Hero Section Styles
  heroSection: {
    backgroundColor: '#f7f9fc',
    fontFamily: 'Arial, sans-serif',
    paddingBottom: '50px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 80px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    margin: '20px 40px 0 40px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '30px',
    marginRight: '10px',
  },
  brandName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  navLinks: {
    display: 'flex',
    gap: '30px',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#555',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  },
  heroContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '60px 80px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroTextContainer: {
    flex: 1,
    maxWidth: '50%',
  },
  heroTitle: {
    fontSize: '60px',
    fontWeight: 'bold',
    color: '#333',
    lineHeight: '1.1',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '24px',
    color: '#555',
    lineHeight: '1.4',
    marginBottom: '40px',
  },
  getStartedButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '50px',
  },
  features: {
    marginTop: '40px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    fontSize: '18px',
    color: '#555',
  },
  icon: {
    fontSize: '24px',
    marginRight: '15px',
    color: '#4CAF50',
  },
  heroImageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '50%',
  },
  heroImage: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
  },

  // How It Works & Impact Sections Styles
  sectionContainer: {
    backgroundColor: '#f7f9fc',
    padding: '80px 0',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '10px',
    margin: '40px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  sectionHeader: {
    marginBottom: '60px',
  },
  sectionTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  sectionSubtitle: {
    fontSize: '20px',
    color: '#666',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto 60px auto',
  },
  card: {
    background: '#ffffff',
    borderRadius: '15px',
    padding: '40px 30px',
    width: '300px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    flexShrink: 0,
  },
  cardIcon: {
    width: '80px',
    height: 'auto',
    marginBottom: '25px',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  cardText: {
    fontSize: '16px',
    color: '#777',
    lineHeight: '1.5',
  },
  arrowIcon: {
    fontSize: '40px',
    color: '#ccc',
    fontWeight: '200',
  },
  simplifiedJourneyText: {
    fontSize: '16px',
    color: '#888',
    marginTop: '40px',
  },

  // Impact Section specific adjustments
  impactCardValue: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: '10px',
  },
  impactCardDescription: {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.3',
    marginBottom: '20px',
  },

  // Testimonials Section specific styles
  testimonialsSection: {
    position: 'relative', // For absolute positioning of brand name and sparkle
    overflow: 'hidden', // To contain the sparkles
  },
  reviewCard: {
    background: '#ffffff',
    borderRadius: '15px',
    padding: '40px',
    width: '350px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    flexShrink: 0,
    textAlign: 'left',
  },
  reviewIcon: {
    height: '40px',
    marginBottom: '10px',
  },
  reviewTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: '10px',
  },
  reviewQuote: {
    fontSize: '16px',
    color: '#555',
    fontStyle: 'italic',
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  reviewAuthor: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#777',
    textAlign: 'right',
  },
  joinMovementText: {
    marginTop: '40px',
    fontSize: '18px',
    color: '#888',
  },
  reviewArrow: {
    fontSize: '40px',
    color: '#ccc',
    cursor: 'pointer',
    position: 'relative',
    top: '30px',
  },
  sparkle: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    fontSize: '40px',
    color: '#ccc',
    transform: 'rotate(20deg)',
    animation: 'sparkle-animation 1.5s infinite',
  }
};

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <header style={styles.navbar}>
          <div style={styles.logoContainer}>
            <img src={logo} alt="RecycloMate Logo" style={styles.logo} />
            <span style={styles.brandName}>RecycloMate</span>
          </div>
          <nav style={styles.navLinks}>
            <a href="#home" style={styles.navLink}>Home</a>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#contact" style={styles.navLink}>Contact</a>
            <Link to="/login" style={styles.loginButton}>Login</Link>
          </nav>
        </header>

        <div style={styles.heroContent}>
          <div style={styles.heroTextContainer}>
            <h1 style={styles.heroTitle}>
              Welcome to <br /> RecycloMate
            </h1>
            <p style={styles.heroSubtitle}>
              Innovative solutions for a <br /> sustainable future
            </p>
            <button style={styles.getStartedButton}>Get Started</button>
            <div style={styles.features}>
              <div style={styles.featureItem}>
                <span style={styles.icon}>✔️</span>
                <span>Easy-to-Use</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.icon}>🌿</span>
                <span>Eco-Friendly</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.icon}>📊</span>
                <span>Data-Driven</span>
              </div>
            </div>
          </div>
          <div style={styles.heroImageContainer}>
            <img src={recycleHero} alt="Recycling illustration" style={styles.heroImage} />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <p style={styles.sectionSubtitle}>Together, we're making a difference</p>
        </div>

        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <img src={step1} alt="Schedule Pickup" style={styles.cardIcon} />
            <h3 style={styles.cardTitle}>Schedule Pickup</h3>
            <p style={styles.cardText}>Select waste type and pickup time</p>
          </div>

          <div style={styles.arrowIcon}>›</div>

          <div style={styles.card}>
            <img src={step2} alt="Track Collection" style={styles.cardIcon} />
            <h3 style={styles.cardTitle}>Track Collection</h3>
            <p style={styles.cardText}>Agent collects and confirms</p>
          </div>

          <div style={styles.arrowIcon}>›</div>

          <div style={styles.card}>
            <img src={step3} alt="Earn Eco-Points" style={styles.cardIcon} />
            <h3 style={styles.cardTitle}>Earn Eco-Points</h3>
            <p style={styles.cardText}>Redeem for rewards</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Impact</h2>
          <p style={styles.sectionSubtitle}>Together, we're making a difference</p>
        </div>

        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <p style={styles.impactCardValue}>10,000+</p>
            <p style={styles.impactCardDescription}>pickups completed</p>
            <img src={impact1} alt="Pickups completed" style={styles.cardIcon} />
          </div>

          <div style={styles.arrowIcon}>›</div>

          <div style={styles.card}>
            <p style={styles.impactCardValue}>500+</p>
            <p style={styles.impactCardDescription}>tons recycled</p>
            <img src={impact2} alt="Tons recycled" style={styles.cardIcon} />
          </div>

          <div style={styles.arrowIcon}>›</div>

          <div style={styles.card}>
            <p style={styles.impactCardValue}>5,000+</p>
            <p style={styles.impactCardDescription}>happy users</p>
            <img src={impact3} alt="Happy users" style={styles.cardIcon} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{...styles.sectionContainer, ...styles.testimonialsSection}}>
        <div style={{...styles.sectionHeader, ...styles.testimonialsHeader}}>
          <h2 style={styles.sectionTitle}>What Our Users Say</h2>
          <p style={styles.sectionSubtitle}>Real stories from our community</p>
        </div>

        <div style={styles.cardsContainer}>
          <div style={styles.reviewCard}>
            <img src={rev1} alt="Effortless & Eco-Friendly" style={styles.reviewIcon} />
            <h3 style={styles.reviewTitle}>Effortless & Eco-Friendly!</h3>
            <p style={styles.reviewQuote}>"RecycloMate makes recycling so easy. My bin is always picked up on time!"</p>
            <p style={styles.reviewAuthor}>– Sarah K, Avid Recycler</p>
          </div>

          <div style={styles.reviewArrow}>›</div>

          <div style={styles.reviewCard}>
            <img src={rev2} alt="Five-Star Service" style={styles.reviewIcon} />
            <h3 style={styles.reviewTitle}>Five-Star Service!</h3>
            <p style={styles.reviewQuote}>The app is intuitive and team super responsive. Love the impact!</p>
            <p style={styles.reviewAuthor}>– John D, Happy User</p>
          </div>

          <div style={styles.reviewArrow}>›</div>

          <div style={styles.reviewCard}>
            <img src={rev3} alt="Making a Difference" style={styles.reviewIcon} />
            <h3 style={styles.reviewTitle}>Making a Difference!</h3>
            <p style={styles.reviewQuote}>I feel great knowing I'm contributing. My old newspapers are now new books!</p>
            <p style={styles.reviewAuthor}>– Mike T, Community Champion</p>
          </div>
        </div>
        
        <p style={styles.joinMovementText}>Join the movement!</p>
      </section>
    </div>
  );
};

export default LandingPage;