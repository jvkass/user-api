import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createCipheriv, createDecipheriv } from "crypto";
import * as bcrypt from "bcrypt";

@Injectable()
export class CryptoService {
  private key: Buffer;

  private iv: Buffer;

  constructor(private readonly configService: ConfigService) {
    this.key = Buffer.from(this.configService.getOrThrow<string>("CRYPTO_KEY"));
    this.iv = Buffer.from(this.configService.getOrThrow<string>("CRYPTO_IV"));
  }

  async encrypt(textToEncrypt: string): Promise<string> {
    const cipher = createCipheriv("aes-256-cbc", this.key, this.iv);

    let encrypted = cipher.update(textToEncrypt);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
  }

  async encryptWithBcrypt(textToEncrypt: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(textToEncrypt, salt);
  }

  async decrypt(text: string): Promise<string> {
    const encryptedText = Buffer.from(text, "hex");
    const decipher = createDecipheriv("aes-256-cbc", this.key, this.iv);

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
}
