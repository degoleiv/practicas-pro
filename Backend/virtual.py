import os
import subprocess

# Listar todos los archivos y directorios en el directorio actual
files = os.listdir('./')

for file in files:
    try:
        # Comprobar si es un directorio y no es el directorio .git
        if os.path.isdir(file) and file != '.git':
            # Cambiar al directorio
            os.chdir(file)
            
            # Crear un entorno virtual
            subprocess.run("python -m venv myenv", shell=True, check=True)
            
            # Ruta al ejecutable de Python dentro del entorno virtual
            python_exec = os.path.join('myenv', 'Scripts', 'python.exe') if os.name == 'nt' else os.path.join('myenv', 'bin', 'python')
            
            # Instalar paquetes desde requirements.txt usando el pip del entorno virtual
            subprocess.run([python_exec, "-m", "pip", "install", "-r", "requirements.txt"], check=True)
            
            # Volver al directorio anterior
            os.chdir('..')
    except Exception as e:
        print(f"Error procesando {file}: {e}")
        # Volver al directorio anterior en caso de error
        os.chdir('..')
        continue
