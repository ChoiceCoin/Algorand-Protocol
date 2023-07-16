# Sample Hello World Beaker smart contract - the most basic starting point for an Algorand smart contract
import beaker
import pyteal as pt
import random

app = beaker.Application("RandomNumberApp")

@app.external

def approval_program():
    on_payment = And(
        Txn.type_enum() == TxnType.Payment,
        Txn.receiver() == Addr("ALICE_ADDRESS")
    )

    transfer_usdc = Seq([
        App.localPut(Int(0), Bytes("sent"), Int(1)),
        App.localPut(Int(0), Bytes("amount"), Int(50)),
        App.localPut(Int(0), Bytes("token"), Int(31566704)),
        App.localPut(Int(0), Bytes("recipient"), Addr("BOB_ADDRESS")),
        Return(Int(1))
    ])

    program = Cond(
        [on_payment, transfer_usdc],
        [Txn.application_id() == Int(0), Return(Int(1))],
        [Txn.application_id() != Int(0), Return(App.localGet(Int(0), Bytes("sent")))]
    )

    return program

# Compile the smart contract
approval_teal = compileTeal(approval_program(), mode=Mode.Application)


# Print the compiled TEAL code
print("Approval Program:")
print(approval_teal)


def random_number(*, output: pt.abi.String) -> pt.Expr:
    # Generate a random number between 1 and 10
    number = random.randint(1, 10)
    # Define the conditions and corresponding actions
    # If the number is X, return Y
    # If the number is Z, return U
    # Otherwise, return an error message
    return pt.If(
        pt.Eq(number, 7),  # Replace X with your desired value
        output.set(pt.Bytes("7")),  # Replace Y with your desired value
        pt.If(
            pt.Eq(number, 6),  # Replace Z with your desired value
            output.set(pt.Bytes("6")),  # Replace U with your desired value
            output.set(pt.Bytes("Invalid number"))
        )
    )


