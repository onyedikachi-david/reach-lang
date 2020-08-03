module Reach.Test.Test_Util (testReachUtil) where

import Reach.Util
import Test.Tasty
import Test.Tasty.HUnit

testFromIntegerMay :: TestTree
testFromIntegerMay =
  testGroup
    "fromIntegerMay"
    [ testCase "does not underflow" $
        let i = fromIntegral (maxBound :: Int) + 1
            mi = fromIntegerMay i :: Maybe Int
         in assertEqual "" mi Nothing
    , testCase "does not overflow" $
        let i = fromIntegral (minBound :: Int) - 1
            mi = fromIntegerMay i :: Maybe Int
         in assertEqual "" mi Nothing
    , testCase "works" $
        let i = 42 :: Integer
            mi = fromIntegerMay i :: Maybe Int
         in assertEqual "" mi (Just 42)
    ]

testReachUtil :: IO TestTree
testReachUtil = pure $ testGroup "Reach.Util" [testFromIntegerMay]
