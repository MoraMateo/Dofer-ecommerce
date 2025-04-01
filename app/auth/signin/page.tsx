import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Iniciar Sesión</h1>
      <SignInForm />
    </div>
  );
}
