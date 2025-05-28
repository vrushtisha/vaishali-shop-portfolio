const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto shadow-sm">
      <div className="container">
        <p className="mb-1 fw-semibold">© {new Date().getFullYear()} MyBusiness</p>
        <small className="text-muted">All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
