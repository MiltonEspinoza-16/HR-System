import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {

  static const String baseUrl =
      'http://10.0.2.2:3000';

  static Future<dynamic> login(
      String username,
      String password
  ) async {

    final response =
        await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {
        'Content-Type':
            'application/json'
      },
      body: jsonEncode({
        'username': username,
        'password': password,
      }),
    );

    return jsonDecode(response.body);
  }

}