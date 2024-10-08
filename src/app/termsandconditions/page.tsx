import React from "react";

const page = () => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white w-full h-full m-32">
      <h1 className="text-5xl font-bold text-center mb-8">
        Terms and Conditions
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-secondary">
            1. General Overview
          </h2>
          <p className="text-lg text-body">
            By participating in the RapidLoans Liquidity Pool, you agree to the
            following terms and conditions. The liquidity pool allows users to
            deposit TRX or JST tokens in exchange for a fixed return over a
            defined period. Additionally, users can borrow tokens from the pool
            under specific conditions. These terms govern your rights and
            responsibilities as a liquidity provider or borrower.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 text-secondary">
            2. Liquidity Provision Terms
          </h2>
          <ul className="list-disc pl-8 text-lg text-body">
            <li>
              <strong>Fixed-Term Deposits:</strong> Liquidity can be added in
              TRX or JST tokens for a fixed period of <strong>15 days</strong>.
              During this time, the deposited tokens are locked in the pool and
              cannot be accessed or withdrawn early.
            </li>
            <li>
              <strong>Interest Rate:</strong> A fixed interest rate of{" "}
              <strong>3%</strong> will be earned on your deposit over the 15-day
              period. Interest is calculated at the end of the investment term
              and can only be withdrawn along with the principal deposit.
            </li>
            <li>
              <strong>Withdrawal Conditions:</strong> You can withdraw your full
              balance (principal + earned interest) after the 15-day period
              ends. No further interest will be earned if you delay withdrawal,
              but you are free to withdraw at any time.
            </li>
            <li>
              <strong>No Additional Deposits:</strong> You cannot add more
              liquidity until you have withdrawn the full amount from a previous
              term. Once withdrawn, a new deposit can be made for the next term.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 text-secondary">
            3. Borrowing Terms
          </h2>
          <ul className="list-disc pl-8 text-lg text-body">
            <li>
              <strong>Loan Eligibility:</strong> To borrow tokens, you must have
              at least <strong>5% more</strong> of the equivalent value of the
              loan in the opposite token already invested in the pool. For
              example, to borrow TRX worth x, you must have JST worth x + 5% in
              the pool.
            </li>
            <li>
              <strong>Loan Term:</strong> Loans are for a{" "}
              <strong>30-day period</strong> with a fixed interest rate of{" "}
              <strong>4%</strong>. Repayment is required within this period.
            </li>
            <li>
              <strong>Late Repayment Penalty:</strong> If not repaid within the
              30-day term, the interest rate doubles, resulting in a total
              interest of <strong>8%</strong>. Collateral may be subject to
              liquidation.
            </li>
            <li>
              <strong>Repayment:</strong> Full loan repayment, including
              interest, is required either within the 30-day period or later
              with a penalty.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 text-secondary">
            4. Flash Loan Provision
          </h2>
          <p className="text-lg text-body">
            The liquidity pool supports flash loans, governed by a separate
            Flash Loan Agreement. Flash loans must be repaid within the same
            transaction, ensuring no risk to the liquidity pool.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 text-secondary">
            5. User Responsibilities
          </h2>
          <ul className="list-disc pl-8 text-lg text-body">
            <li>
              <strong>Accurate Information:</strong> You are responsible for
              ensuring your deposits and loans are accurate and valid.
              RapidLoans is not liable for any loss resulting from incorrect
              transactions or failed repayments.
            </li>
            <li>
              <strong>Risk of Loss:</strong> Participating in the liquidity pool
              involves financial risk. While the pool offers fixed interest
              rates, market conditions may affect token value.
            </li>
            <li>
              <strong>No Early Withdrawal:</strong> Liquidity cannot be
              withdrawn before the 15-day term ends, except under extreme
              circumstances permitted by RapidLoans.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 text-secondary">
            6. Modification of Terms
          </h2>
          <p className="text-lg text-body">
            RapidLoans reserves the right to amend these terms at any time.
            Changes will be communicated via the platform, and continued
            participation signifies acceptance of modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 text-secondary">
            7. Termination and Suspension
          </h2>
          <p className="text-lg text-body">
            RapidLoans reserves the right to suspend or terminate access to the
            liquidity pool at its discretion. In case of termination, all users
            can withdraw their funds after the 15-day term ends.
          </p>
        </section>
      </div>
    </div>
  );
};

export default page;
