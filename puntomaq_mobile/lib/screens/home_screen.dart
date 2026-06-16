import 'login_screen.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';

import '../services/attendance_service.dart';
import 'map_screen.dart';

class HomeScreen extends StatefulWidget {

  final dynamic user;

  const HomeScreen({
    super.key,
    required this.user,
  });

  @override
  State<HomeScreen> createState() =>
      _HomeScreenState();

}

class _HomeScreenState
    extends State<HomeScreen> {

  Position? position;

  bool cargandoGps = true;

  @override
  void initState() {

    super.initState();

    obtenerUbicacion();

  }

  Future<void> obtenerUbicacion()
  async {

    try {

      Position pos =
          await Geolocator
              .getCurrentPosition();

      setState(() {

        position = pos;

        cargandoGps = false;

      });

    } catch (e) {

      setState(() {

        cargandoGps = false;

      });

    }

  }

  Future<void> registrarAsistencia()
  async {

    try {

      final response =
          await AttendanceService
              .registrarAsistencia(
        widget.user['employee_id'],
      );

      print(response);

      if (!mounted) return;

      ScaffoldMessenger.of(
        context,
      ).showSnackBar(

        const SnackBar(

  backgroundColor: Colors.green,

  behavior: SnackBarBehavior.floating,

  duration: Duration(
    seconds: 3,
  ),

  content: Row(

    children: [

      Icon(
        Icons.check_circle,
        color: Colors.white,
      ),

      SizedBox(width: 10),

      Expanded(

        child: Text(
          'Asistencia registrada correctamente',
        ),

      ),

    ],

  ),

),

      );

    } catch (e) {

      ScaffoldMessenger.of(
        context,
      ).showSnackBar(

        SnackBar(
          backgroundColor:
              Colors.red,
          content: Text(
            'Error: $e',
          ),
        ),

      );

    }

  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      backgroundColor:
          const Color(0xFF001F7A),

     appBar: AppBar(

  backgroundColor:
      const Color(0xFF00155A),

    title: const Text(
      'PUNTOMAQ RRHH',
      style: TextStyle(
        color: Colors.white,
        fontWeight: FontWeight.bold,
        fontSize: 20,
      ),
    ),

  centerTitle: true,

  actions: [

    IconButton(

      icon: const Icon(
        Icons.logout,
        color: Colors.white,
      ),

      tooltip: 'Cerrar sesión',

      onPressed: () {

        Navigator.pushAndRemoveUntil(

          context,

          MaterialPageRoute(
            builder: (_) =>
                const LoginScreen(),
          ),

          (route) => false,

        );

      },

    ),

  ],

),

      body: SingleChildScrollView(

        padding:
            const EdgeInsets.all(20),

        child: Column(

          children: [

            Image.asset(
              'assets/logo.png',
              height: 120,
            ),

            const SizedBox(
              height: 20,
            ),

            Card(

              shape:
                  RoundedRectangleBorder(
                borderRadius:
                    BorderRadius.circular(
                  20,
                ),
              ),

              child: Padding(

                padding:
                    const EdgeInsets.all(
                  20,
                ),

                child: Column(

                  children: [

                    const Icon(
                      Icons.person,
                      size: 60,
                      color:
                          Color(
                        0xFF001F7A,
                      ),
                    ),

                    const SizedBox(
                      height: 10,
                    ),

                 Text(
                  widget.user['rol'],

                      style:
                          const TextStyle(
                        fontSize: 22,
                        fontWeight:
                            FontWeight.bold,
                      ),

                    ),
                    Text(
                    'Empleado ID: ${widget.user['employee_id'] ?? 'No asignado'}',
                    style: const TextStyle(
                      color: Colors.grey,
                    ),
                  ),

                    const SizedBox(
                      height: 5,
                    ),

                    Text(
                      widget.user[
                          'rol'],
                    ),

                  ],

                ),

              ),

            ),

            const SizedBox(
              height: 20,
            ),

            Card(

              shape:
                  RoundedRectangleBorder(
                borderRadius:
                    BorderRadius.circular(
                  20,
                ),
              ),

              child: Padding(

                padding:
                    const EdgeInsets.all(
                  20,
                ),

                child: Column(

                  children: [

                    const Icon(
                      Icons.location_on,
                      color:
                          Colors.red,
                      size: 50,
                    ),

                    const SizedBox(
                      height: 10,
                    ),

                    const Text(

                      'Ubicación Actual',

                      style: TextStyle(
                        fontWeight:
                            FontWeight.bold,
                        fontSize: 18,
                      ),

                    ),

                    const SizedBox(
                      height: 10,
                    ),

                    cargandoGps

                        ? const CircularProgressIndicator()

                        : Text(

                            position == null

                                ? 'No disponible'

                                : 'Lat: ${position!.latitude}\nLng: ${position!.longitude}',

                            textAlign:
                                TextAlign.center,

                          ),

                  ],

                ),

              ),

            ),

            const SizedBox(
              height: 20,
            ),

            SizedBox(

              width:
                  double.infinity,

              height: 60,

              child:
                  ElevatedButton.icon(

                style:
                    ElevatedButton
                        .styleFrom(

                  backgroundColor:
                      Colors.white,

                ),

                icon: const Icon(
                  Icons.map,
                  color:
                      Color(
                    0xFF001F7A,
                  ),
                ),

                label: const Text(

                  'VER MAPA',

                  style: TextStyle(
                    color:
                        Color(
                      0xFF001F7A,
                    ),
                    fontWeight:
                        FontWeight.bold,
                  ),

                ),

                onPressed: () {

                  Navigator.push(

                    context,

                    MaterialPageRoute(

                      builder: (_) =>
                          const MapScreen(),

                    ),

                  );

                },

              ),

            ),

            const SizedBox(
              height: 15,
            ),

            if (widget.user[
                    'employee_id'] !=
                null)

              SizedBox(

                width:
                    double.infinity,

                height: 60,

                child:
                    ElevatedButton.icon(

                  style:
                      ElevatedButton
                          .styleFrom(

                    backgroundColor:
                        Colors.green,

                  ),

                  icon: const Icon(
                    Icons.fingerprint,
                  ),

                  label: const Text(
                    'REGISTRAR ASISTENCIA',
                  ),

                  onPressed:
                      registrarAsistencia,

                ),

              ),

          ],

        ),

      ),

    );

  }

}