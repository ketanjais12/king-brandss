function About() {
  return (
    <section className="home-section information-page">
      <h1 className="section-title">ABOUT KING BRANDSS</h1>

      <section className="information-section">
        <h2>The Perfect Man Shop</h2>
        <p>
          Explore denim and clothing collections through the KING BRANDSS
          storefront.
        </p>
      </section>

      <section className="information-section" id="demo">
        <h2>About this demo</h2>
        <p>
          This website is a front-end assignment built from the supplied
          KING BRANDSS design. Product images and size options include
          demonstration content. No real payments or orders are processed.
        </p>
      </section>

     <section className="information-section" id="privacy">
  <h2>Privacy information</h2>

  <p>
    Cart items, saved products, newsletter preference and demo order
    history are stored locally in this browser. Demo orders include
    product details, quantities, totals and order references.
  </p>

  <p>
    Checkout contact details and delivery addresses are not saved or
    sent to a server. The newsletter form does not send your email
    to a mailing service.
  </p>

  <p>
    Clearing this website’s browser data removes saved preferences
    and demo order history. Product images and fonts currently load
    from external providers.
  </p>
</section>
    </section>
  );
}

export default About;