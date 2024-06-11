
import pandas as pd
porcentajes = {
    'Contaduría Pública': 55,
    'Tc. En Costos y Auditoría': 50,
    'Ingeniería Civil (plan nuevo)': 75,
    'Ingeniería Civil (plan antiguo)': 70,
    'otros':  60
}
fields = ['estudiante_nombre', 'estudiante_tipo_identificacion', 'estudiante_numero_documento', 'estudiante_correo', 'facultad',
          'estudiante_programa', 'estudiante_id', 'estudiante_numero', 'requisitos_practica_rs', 'creditos', 'total_creditos']


programa_general = 'otros'
pathdb = r"genesis/genesisBD.xlsx"
# simulacion de datos obtenidos desde genesis
df = pd.read_excel(pathdb, index_col=None)
record_dicts = df.to_dict(orient='records')


def search_student(id):

    print(record_dicts)
    for dic in record_dicts:
        if dic['estudiante_id'] == int(id):
            porcentaje_estudiante = dic['creditos']*100/dic['total_creditos']

            if dic['estudiante_programa'] in porcentajes:
                porcentaje_requerido = porcentajes[dic['estudiante_programa']]
            else:
                porcentaje_requerido = porcentajes[programa_general]

            dic['requisitos_porcentaje_creditos'] = porcentaje_estudiante >= porcentaje_requerido

            if dic['facultad'] == 'Educación (Plan Nuevo)':
                pass
                # debe contar con practicas formativas
            dic = {
                **dic,
                "observaciones_PRS": "",
                "observaciones_NRC": "",
                "estudiante_estado_civil": "",
                "estudiante_hijos": "",
                "periodo": "2024-1",
                "practica": "1",
            }

            return {k: str(v) for k, v in dic.items()}
        else:
            print(
                "el id del estudiante no se encuentra en genesis (valide con el area encargada)")
