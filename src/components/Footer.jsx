// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
      © {new Date().getFullYear()} MyBlog — Built with ❤️ using React + Tailwind
    </footer>
  )
}
