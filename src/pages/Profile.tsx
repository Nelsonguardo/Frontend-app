import React, { useEffect, useState, ChangeEvent } from "react";
import { getUserProfile, uploadProfilePhoto } from "../services/api";
import { useHistory } from "react-router-dom";
import "./Profile.css";

interface RedesSociales {
  github: string;
  linkedin: string;
  sitio_web: string;
  twitter: string;
}

interface BasicInfo {
  first_name: string;
  last_name: string;
  email: string;
  foto: string | null;
  biografia: string;
  redes_sociales: RedesSociales;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<BasicInfo & { tipo_usuario?: string, educacion?: any[] } | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
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
        const { basic_info, tipo_usuario, educacion } = data.data;
        const profileData = { ...basic_info, tipo_usuario, educacion };
        setProfile(profileData);
      } catch (err) {
        console.error("Error al cargar perfil:", err);
        setMensaje("Error al cargar perfil");
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handlePhotoUpload = async () => {
    if (!photo) return;
    const token = localStorage.getItem("access_token") || "";
    try {
      const data = await uploadProfilePhoto(token, photo);
      setMensaje("Foto actualizada correctamente.");
      setProfile({ ...profile, foto: data.data.foto } as any);
    } catch (err) {
      setMensaje("Error al subir la foto.");
    }
  };

  return (
    <div className="container profile-container">
      {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}
      {profile ? (
        <div className="card profile-card shadow">
          <div className="card-header bg-primary text-white">
            <h4>Perfil de Usuario</h4>
          </div>
          <div className="card-body">
            <div className="profile-photo-section text-center">
              {profile.foto ? (
                <img
                  src={profile.foto} 
                  alt="Foto de perfil"
                  className="profile-photo rounded-circle"
                />
              ) : (
                <img
                  src="/default-profile.png"
                  alt="Foto de perfil por defecto"
                  className="profile-photo rounded-circle"
                />
              )}
              <div className="mt-3">
                <label htmlFor="photo-upload" className="form-label">Cambiar foto</label>
                <input type="file" id="photo-upload" className="form-control" onChange={handleFileChange} />
                <button className="btn btn-outline-primary mt-2" onClick={handlePhotoUpload}>
                  Actualizar Foto
                </button>
              </div>
            </div>
            <div className="profile-info text-center mt-4">
              <h5>{profile.first_name} {profile.last_name}</h5>
              <p className="text-muted">{profile.email}</p>
              <hr />
              <p><strong>Biografía:</strong></p>
              <p>{profile.biografia}</p>
              {/* Educación */}
              {profile.educacion && profile.educacion.length > 0 && (
                <div className="profile-education mt-4 text-start">
                  <h5>Educación</h5>
                  <ul style={{paddingLeft: '1.2rem'}}>
                    {profile.educacion.map((edu, idx) => (
                      <li key={idx} style={{marginBottom: '0.5rem'}}>
                        <strong>{edu.titulo || edu.titulo_estudio || 'Título'}</strong>
                        {edu.institucion && <> - {edu.institucion}</>}
                        {edu.anio && <> ({edu.anio})</>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="social-links mt-3 text-start">
                <p><strong>GitHub:</strong> <a href={profile.redes_sociales.github} target="_blank" rel="noreferrer">{profile.redes_sociales.github}</a></p>
                <p><strong>LinkedIn:</strong> <a href={profile.redes_sociales.linkedin} target="_blank" rel="noreferrer">{profile.redes_sociales.linkedin}</a></p>
                <p><strong>Sitio Web:</strong> <a href={profile.redes_sociales.sitio_web} target="_blank" rel="noreferrer">{profile.redes_sociales.sitio_web}</a></p>
                <p><strong>Twitter:</strong> <a href={profile.redes_sociales.twitter} target="_blank" rel="noreferrer">{profile.redes_sociales.twitter}</a></p>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-secondary" onClick={() => history.push("/edit")}>Editar Perfil</button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Cargando perfil...</p>
      )}
    </div>
  );
};

export default Profile;