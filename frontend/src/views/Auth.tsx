import React from "react";
import { SonicButton } from "../components/SonicButton";
import { useState } from "react";
import { Link } from "react-router";
import type { ChangeEvent, FormEvent } from "react";
import type { IAuthCredentials } from "../types/types";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState<IAuthCredentials>({
    nickName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegistering) {
      console.log("Registrando usuario", formData);
    } else {
      console.log("Iniciando sesión", formData);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            {isRegistering ? "Crea tu cuenta" : "Bienvenido de nuevo"}
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            {isRegistering
              ? "Regístrate para guardar tus canciones favoritas"
              : "Ingresa a tu cuenta del reproductor"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Nombre de usuario
              </label>
              <input
                type="text"
                name="nickName"
                value={formData.nickName}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="Tu nombre"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <SonicButton>
            {isRegistering ? "Registrarse" : "Iniciar Sesión"}
          </SonicButton>

        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs text-zinc-400 hover:text-blue-400 transition-colors"
          >
            {isRegistering
              ? "¿Ya tienes una cuenta? Inicia sesión"
              : "¿No tienes cuenta? Regístrate aquí"}
          </button>
        </div>

        <div className="text-center mt-4 border-t border-zinc-800 pt-4">
          <Link to="/" className="text-xs text-zinc-500 hover:text-zinc-300">
            ← Volver al reproductor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
