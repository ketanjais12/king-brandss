import Promotions from '../components/Promotions';

function Offers() {
  return (
    <>
      <section className="home-section offers-intro">
        <h1 className="section-title">OFFERS & FEATURED COLLECTIONS</h1>
        <p>
          Explore our latest drops and denim collection.
          No promotional discount is currently configured in this demo.
        </p>
      </section>

      <Promotions />
    </>
  );
}

export default Offers;