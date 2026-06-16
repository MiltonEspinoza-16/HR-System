import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:geolocator/geolocator.dart';

class AttendanceService {

  static Future registrarAsistencia(
    int employeeId,
  ) async {

    bool serviceEnabled =
        await Geolocator
            .isLocationServiceEnabled();

    if (!serviceEnabled) {
      throw Exception(
        'GPS desactivado'
      );
    }

    LocationPermission permission =
        await Geolocator
            .checkPermission();

    if (permission ==
        LocationPermission.denied) {

      permission =
          await Geolocator
              .requestPermission();
    }

    Position position =
        await Geolocator
            .getCurrentPosition();

    final now =
        DateTime.now();

    final response =
        await http.post(

      Uri.parse(
        'http://10.0.2.2:3000/attendances',
      ),

      headers: {
        'Content-Type':
            'application/json'
      },

      body: jsonEncode({

        "employee_id":
            employeeId,

        "fecha":
            now
                .toString()
                .split(' ')[0],

        "hora_entrada":
            now
                .toString()
                .split(' ')[1]
                .substring(0, 8),

        "estado":
            "PRESENTE",

        "latitud":
            position.latitude
                .toString(),

        "longitud":
            position.longitude
                .toString()

      }),
    );

    return jsonDecode(
      response.body,
    );
  }
}