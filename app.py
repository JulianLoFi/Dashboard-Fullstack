
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
  
# Mostrar todas las filas
pd.set_option('display.max_rows', None)
    
# Función de formato personalizada
def custom_float_format(x):
    if x.is_integer():
        return '{:.0f}'.format(x)  
    else:
        return '{:.2f}'.format(x) 

# Aplica la función de formato a todos los números del DataFrame
pd.set_option('display.float_format', custom_float_format)

#Leer .csv
df = pd.read_csv('static/data/co2_data.csv')
    
# Rellenar Nulos(NaN) con Ceros(0)
df = df.fillna(0)

# Crear la Columna 'gdp_per_capita'
df['gdp_per_capita'] = np.where(df['population']!= 0, df['gdp']/ df['population'], 0)


def consultarFecha(num):

    # Co2 con los países filtrados según el año indicado
    df_filtro = df.loc[(df['year'] == num) & 
                       (df['country'].isin(['Africa','Africa (GCP)','Antarctica','Asia','Asia (GCP)','Central America','Central America (GCP)','Europe','Europe (GCP)','Middle East','Middle East (GCP)','North America','North America (GCP)','Oceania','Oceania (GCP)','South America','South America (GCP)', 'World'])), 
                       ['country', 'co2','co2_per_capita','population', 'year']] 

    regiones = {
        "World": {
            "country": "World"
        },
        "Europe": {
            "country": "Europe (GCP)"
        },
        "Africa": {
            "country": "Africa (GCP)",
            "co2_per_capita_country": "Africa"
        },
        "Asia": {
            "country": "Asia (GCP)"
        },
        "North_America": {
            "country": "North America (GCP)"
        },
        "Oceania": {
            "country": "Oceania (GCP)"
        },
        "South_America": {
            "country": "South America (GCP)"
        }
    }

    df_final = {}

    for region, config in regiones.items():

        filtro = df_filtro[df_filtro["country"] == config["country"]]
        
        datos = {
            "year": int(filtro["year"].iloc[0]),
            "country": filtro["country"].iloc[0],
            "co2": float(filtro["co2"].iloc[0]),
            "population": int(filtro["population"].iloc[0]),
            "co2_per_capita": float(filtro["co2_per_capita"].iloc[0])
        }

        if "co2_per_capita_country" in config:
        
                filtro_per_capita = df_filtro[
                    df_filtro["country"] == config["co2_per_capita_country"]
                ]
        
                datos["co2_per_capita"] = filtro_per_capita["co2_per_capita"].iloc[0]
        
        df_final[region] = datos

    return df_final


def consultarMasFechas(num):

    df_filtro = df.loc[(df['year'] >= 1850) & (df['year'] <= num) & 
                           (df['country'].isin(['Africa','Africa (GCP)','Antarctica','Asia','Asia (GCP)','Central America','Central America (GCP)','Europe','Europe (GCP)','Middle East','Middle East (GCP)','North America','North America (GCP)','Oceania','Oceania (GCP)','South America','South America (GCP)', 'World'])), 
                           ['country', 'co2','co2_per_capita','population', 'year']]
    
    regiones = {
        "World": {
            "country": "World"
        },
        "Europe": {
            "country": "Europe (GCP)"
        },
        "Africa": {
            "country": "Africa (GCP)",
            "co2_per_capita_country": "Africa"
        },
        "Asia": {
            "country": "Asia (GCP)"
        },
        "North_America": {
            "country": "North America (GCP)"
        },
        "Oceania": {
            "country": "Oceania (GCP)"
        },
        "South_America": {
            "country": "South America (GCP)"
        }
    }


    df_final = {}

    for region, config in regiones.items():

        filtro = df_filtro[df_filtro["country"] == config["country"]]

        datos = {
            "year": filtro["year"].tolist(),
            "co2": filtro["co2"].tolist()
        }

        if "co2_per_capita_country" in config:

            filtro_per_capita = df_filtro[
                df_filtro["country"] == config["co2_per_capita_country"]
            ]

            datos["co2_per_capita"] = filtro_per_capita["co2_per_capita"].tolist()

        df_final[region] = datos
    
    return df_final

def consultarTendencia(num):
    

    df_filtro = df.loc[(df['year'] >= 1850) & (df['year'] <= num) & 
                            (df['country'].isin(['Africa (GCP)','Antarctica','Asia (GCP)','Central America (GCP)','Europe (GCP)','Middle East (GCP)','North America (GCP)','Oceania (GCP)','South America (GCP)', 'World'])), 
                            ['country','year' , 'co2']]

    regiones = {
            "World": {
                "country": "World"
            },
            "Europe": {
                "country": "Europe (GCP)"
            },
            "Africa": {
                "country": "Africa (GCP)"
            },
            "Asia": {
                "country": "Asia (GCP)"
            },
            "North_America": {
                "country": "North America (GCP)"
            },
            "Oceania": {
                "country": "Oceania (GCP)"
            },
            "South_America": {
                "country": "South America (GCP)"
            }
        }

    df_final = {}

    for region, config in regiones.items():

        estado = ""
         
        filtro = df_filtro[df_filtro["country"] == config["country"]]

        co2 = filtro["co2"].tolist()

        tendencia = ((co2[-1] - co2[-2])/co2[-2])*100

        if tendencia > 0:
            estado = 'positivo'
        elif tendencia < 0:
            estado = 'negativo'
        else:
            estado = 'neutro' 
         
        datos = {
            "Tendencia": f"{tendencia:.2f}%",
            "Estado": estado
            }

        df_final[region] = datos

    return df_final


# Endpoints Flask
    
@app.route("/<int:fecha>", methods=["GET"])
def obtener_fecha(fecha):
    data_final = consultarFecha(fecha)
    return jsonify(data_final)

@app.route("/tendencia/<int:fecha>", methods=["GET"])
def obtener_tendencia(fecha):
    tendencia_final = consultarTendencia(fecha)
    return jsonify(tendencia_final)
    
@app.route("/mas-fechas/<int:fecha>", methods=["GET"])
def obtener_mas_fechas(fecha):
    data_final = consultarMasFechas(fecha)
    return jsonify(data_final)
    
    
    
if __name__ == "__main__":
    app.run(debug=True)