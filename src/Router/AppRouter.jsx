import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../Auth/routes/AuthRoutes";
import { JournalRoutes } from "../Journal/routes/JournalRoutes";
import { ChekingAuth } from "../Ui";
import { useCheckAuth } from "../Hooks";
import { HomePage } from "../Journal/Pages/HomePage";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === "checking") {
    return <ChekingAuth />;
  }

  return (
    <Routes>
      {/* Página principal antes del registro */}
      <Route path="/" element={<HomePage />} />

      {status === "authenticated" ? (
        // 🔹 Si está autenticado, puede acceder al journal
        <>
          <Route path="/journal/*" element={<JournalRoutes />} />
          <Route path="/*" element={<Navigate to="/journal" />} />
        </>
      ) : (
        // 🔹 Si NO está autenticado, puede ir al login o registro
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
