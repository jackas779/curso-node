import psutil

import time

 

# Variable para guardar los procesos ya detectados

procesos_previos = set(p.info['pid'] for p in psutil.process_iter(attrs=['pid']))

# para poder ver y comparar que procesos se estan ejecutando en el sistema antes de comparar
for pid in procesos_previos: 
  print(f"proceso previos: PID: {pid}, Nombre: {proceso.name()} ")

 

while True:

    # Capturar procesos actuales

    procesos_actuales = set(p.info['pid'] for p in psutil.process_iter(attrs=['pid']))

 

    # Identificar nuevos procesos

    nuevos_procesos = procesos_actuales - procesos_previos

 

    # Mostrar alerta para cada nuevo proceso

    for pid in nuevos_procesos:

        proceso = psutil.Process(pid)

        print(f"Alerta: Nuevo proceso detectado - PID: {pid}, Nombre: {proceso.name()}")

 
    # Actualizar lista de procesos previos

    procesos_previos = procesos_actuales

 

    # Esperar antes del próximo escaneo

    time.sleep(2)