export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        {currentYear} E-Commerce, All Rights Reserved
      </div>
    </footer>
  );
}
