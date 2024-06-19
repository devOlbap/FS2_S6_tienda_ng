
import { Rol } from "./rol";

export interface User {
    id          :number;
    nombres     :string; 
    apellidos   :string;
    correo      :string; 
    rol         :Rol;
    username    :string;
    pass        :string;
    fecha_nac   :string;
    calle       :string;
    numeracion  :string;
    comuna      :string;
}
