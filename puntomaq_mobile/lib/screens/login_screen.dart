import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'home_screen.dart';


class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() =>
      _LoginScreenState();
}

class _LoginScreenState
    extends State<LoginScreen> {

  final usernameController =
      TextEditingController();

  final passwordController =
      TextEditingController();

  bool loading = false;

  Future<void> login() async {

    setState(() {
      loading = true;
    });

    final response =
        await ApiService.login(
      usernameController.text,
      passwordController.text,
    );

    setState(() {
      loading = false;
    });

    if (response['success'] == true) {

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => HomeScreen(
            user: response['user'],
          ),
        ),
      );

    } else {

      ScaffoldMessenger.of(context)
          .showSnackBar(
        SnackBar(
          backgroundColor: Colors.red,
          content: Text(
            response['message'],
          ),
        ),
      );

    }

  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      body: Stack(

        children: [

          SizedBox.expand(
            child: Image.asset(
              'assets/background.png',
              fit: BoxFit.cover,
            ),
          ),

          Container(
            color:
                Colors.black.withOpacity(
              0.2,
            ),
          ),

          Center(

            child: SingleChildScrollView(

              child: Container(

                margin:
                    const EdgeInsets.all(25),

                padding:
                    const EdgeInsets.all(25),

                decoration:
                    BoxDecoration(

                  color:
                      Colors.white.withOpacity(
                    0.12,
                  ),

                  borderRadius:
                      BorderRadius.circular(
                    20,
                  ),

                ),

                child: Column(

                  mainAxisSize:
                      MainAxisSize.min,

                  children: [

                    Image.asset(
                      'assets/logo.png',
                      height: 130,
                    ),

                    const SizedBox(
                      height: 20,
                    ),

                    const Text(

                      'PUNTOMAQ RRHH',

                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 28,
                        fontWeight:
                            FontWeight.bold,
                      ),

                    ),

                    const Text(

                      'Sistema de Recursos Humanos',

                      style: TextStyle(
                        color:
                            Colors.white70,
                      ),

                    ),

                    const SizedBox(
                      height: 30,
                    ),

                    TextField(

                      controller:
                          usernameController,

                      style:
                          const TextStyle(
                        color: Colors.white,
                      ),

                      decoration:
                          InputDecoration(

                        labelText:
                            'Usuario',

                        labelStyle:
                            const TextStyle(
                          color:
                              Colors.white,
                        ),

                        filled: true,

                        fillColor:
                            Colors.white10,

                        border:
                            OutlineInputBorder(
                          borderRadius:
                              BorderRadius.circular(
                            12,
                          ),
                        ),

                      ),

                    ),

                    const SizedBox(
                      height: 15,
                    ),

                    TextField(

                      controller:
                          passwordController,

                      obscureText: true,

                      style:
                          const TextStyle(
                        color: Colors.white,
                      ),

                      decoration:
                          InputDecoration(

                        labelText:
                            'Contraseña',

                        labelStyle:
                            const TextStyle(
                          color:
                              Colors.white,
                        ),

                        filled: true,

                        fillColor:
                            Colors.white10,

                        border:
                            OutlineInputBorder(
                          borderRadius:
                              BorderRadius.circular(
                            12,
                          ),
                        ),

                      ),

                    ),

                    const SizedBox(
                      height: 25,
                    ),

                    SizedBox(

                      width:
                          double.infinity,

                      height: 55,

                      child:
                          ElevatedButton(

                        onPressed:
                            loading
                                ? null
                                : login,

                        style:
                            ElevatedButton
                                .styleFrom(
                          backgroundColor:
                              Colors.white,
                        ),

                        child: loading

                            ? const CircularProgressIndicator()

                            : const Text(
                                'INICIAR SESIÓN',
                                style:
                                    TextStyle(
                                  color:
                                      Color(
                                    0xFF001F7A,
                                  ),
                                  fontWeight:
                                      FontWeight.bold,
                                ),
                              ),

                      ),

                    )

                  ],

                ),

              ),

            ),

          )

        ],

      ),

    );

  }

}