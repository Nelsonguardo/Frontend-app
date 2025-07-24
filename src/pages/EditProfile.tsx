import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { getUserProfile, editUserProfile } from "../services/api";
import "./EditProfile.css";

interface RedesSociales {
  github: string;
  linkedin: string;
  sitio_web: string;
  twitter: string;
}

interface ProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
  telefono?: string;
  tipo_usuario?: string;
  tipo_naturaleza?: string;
  biografia?: string;
  documento?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  sitio_web?: string;
  esta_verificado?: boolean;
  redes_sociales?: RedesSociales;
}

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState<ProfileData>({});
  const [mensaje, setMensaje] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token") || "";
      if (!token) {
        setMensaje("No se encontró token. Inicia sesión nuevamente.");
        return;
      }
      try {
        const data = await getUserProfile(token);
        const { basic_info, tipo_usuario } = data.data;
        setFormData({
          first_name: basic_info.first_name,
          last_name: basic_info.last_name,
          email: basic_info.email,
          biografia: basic_info.biografia,
          telefono: basic_info.telefono,
          documento: basic_info.documento,
          linkedin: basic_info.redes_sociales?.linkedin,
          twitter: basic_info.redes_sociales?.twitter,
          github: basic_info.redes_sociales?.github,
          sitio_web: basic_info.redes_sociales?.sitio_web,
          tipo_usuario: tipo_usuario,
        });
      } catch (err) {
        console.error("Error al cargar perfil:", err);
        setMensaje("Error al cargar perfil");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token") || "";
    try {
      const payload = {
        user: {
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
        telefono: formData.telefono,
        tipo_usuario: formData.tipo_usuario,
        tipo_naturaleza: formData.tipo_naturaleza,
        biografia: formData.biografia,
        documento: formData.documento,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        github: formData.github,
        sitio_web: formData.sitio_web,
        esta_verificado: formData.esta_verificado ? "true" : "false"
      };

      const response = await editUserProfile(token, payload);
      if (response.status === "success") {
        setMensaje(response.message);
        history.push("/profile");
      } else {
        setMensaje("Error al actualizar perfil");
      }
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      setMensaje("Error al actualizar perfil");
    }
  };

  return (
    <div className="container editprofile-container">
      <div className="card editprofile-card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Editar Perfil</h3>
        </div>
        <div className="card-body">
          {mensaje && <div className="alert alert-info">{mensaje}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name" className="form-label">Nombre</label>
                <input type="text" id="first_name" name="first_name" className="form-control" value={formData.first_name || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="last_name" className="form-label">Apellido</label>
                <input type="text" id="last_name" name="last_name" className="form-control" value={formData.last_name || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Correo</label>
                <input type="email" id="email" name="email" className="form-control" value={formData.email || ''} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input type="text" id="telefono" name="telefono" className="form-control" value={formData.telefono || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tipo_usuario" className="form-label">Tipo de Usuario</label>
                <input type="text" id="tipo_usuario" name="tipo_usuario" className="form-control" value={formData.tipo_usuario || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="tipo_naturaleza" className="form-label">Tipo de Naturaleza</label>
                <input type="text" id="tipo_naturaleza" name="tipo_naturaleza" className="form-control" value={formData.tipo_naturaleza || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="documento" className="form-label">Documento</label>
                <input type="text" id="documento" name="documento" className="form-control" value={formData.documento || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="linkedin" className="form-label">LinkedIn</label>
                <input type="text" id="linkedin" name="linkedin" className="form-control" value={formData.linkedin || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="twitter" className="form-label">Twitter</label>
                <input type="text" id="twitter" name="twitter" className="form-control" value={formData.twitter || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="github" className="form-label">GitHub</label>
                <input type="text" id="github" name="github" className="form-control" value={formData.github || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sitio_web" className="form-label">Sitio Web</label>
                <input type="text" id="sitio_web" name="sitio_web" className="form-control" value={formData.sitio_web || ''} onChange={handleChange} />
              </div>
              <div className="form-group"></div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="biografia" className="form-label">Biografía</label>
                <textarea id="biografia" name="biografia" className="form-control" rows={3} value={formData.biografia || ''} onChange={handleChange} />
              </div>
              <div className="form-group"></div>
            </div>
            <button type="submit" className="btn btn-primary">Actualizar Perfil</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;