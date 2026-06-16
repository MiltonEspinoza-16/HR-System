import 'package:flutter/material.dart';

import 'package:google_maps_flutter/google_maps_flutter.dart';

import 'package:geolocator/geolocator.dart';

class MapScreen extends StatefulWidget {

  const MapScreen({
    super.key,
  });

  @override
  State<MapScreen> createState() =>
      _MapScreenState();

}

class _MapScreenState
    extends State<MapScreen> {

  LatLng? currentPosition;

  @override
  void initState() {

    super.initState();

    obtenerUbicacion();

  }

  Future<void> obtenerUbicacion()
  async {

    Position position =
        await Geolocator
            .getCurrentPosition();

    setState(() {

      currentPosition = LatLng(
        position.latitude,
        position.longitude,
      );

    });

  }

  @override
  Widget build(
    BuildContext context,
  ) {

    if (currentPosition == null) {

      return const Scaffold(

        body: Center(
          child:
              CircularProgressIndicator(),
        ),

      );

    }

    return Scaffold(

      appBar: AppBar(
        title:
            const Text('Mi Ubicación'),
      ),

      body: GoogleMap(

        initialCameraPosition:
            CameraPosition(
          target:
              currentPosition!,
          zoom: 17,
        ),

        markers: {

          Marker(

            markerId:
                const MarkerId(
              'empleado',
            ),

            position:
                currentPosition!,

            infoWindow:
                const InfoWindow(
              title:
                  'Estoy aquí',
            ),

          )

        },

      ),

    );

  }

}