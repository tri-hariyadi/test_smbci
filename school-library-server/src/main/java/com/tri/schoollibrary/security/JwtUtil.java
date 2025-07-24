package com.tri.schoollibrary.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.*;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {
    private static final String SECRET = "my-very-secret-key-which-should-be-long-enough";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 7;
    private static final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(Map<String, Object> claims) {
        return Jwts.builder()
                .claims(claims)
                .issuer("school-library")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();

//        return Jwts.builder()
//                .claims(claims)
//                .issuedAt(new Date())
//                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 jam
//                .encryptWith(password, alg, enc)
//                .compact();
    }

    public Map<String, Object> extractClaims(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key) // Verifikasi signature
                .build()
                .parseSignedClaims(token) // Parse claims
                .getPayload(); // Ambil data di dalamnya

//        return Jwts.parser()
//                .decryptWith(password)
//                .build()
//                .parseEncryptedClaims(token)
//                .getPayload();
    }

    public Map<String, Object> validateToken(String token) {
        return extractClaims(token);
    }
}
