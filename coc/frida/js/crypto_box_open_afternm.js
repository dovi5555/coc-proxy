Interceptor.attach(ptr(addr),
{
    onEnter(args)
    {
        this.message = args[0];
        this.ciphertext = args[1];
        this.length = args[2];
        this.unknown = args[3];
        this.nonce = args[4];
        this.k = args[5];
        send("k", Memory.readByteArray(this.k, 32));
        send("nonce", Memory.readByteArray(this.nonce, 24));
    },
    onLeave(retval)
    {
        send("message", Memory.readByteArray(this.message.add(32), this.length.toInt32() - 32));
    }
});
